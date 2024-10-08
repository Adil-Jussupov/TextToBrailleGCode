import brailleConsts

# Define the long text variable
long_text = """breakfast - served all day

OMELETTE - SCRAMBLED EGGS v
cooked with pinch of S&P, served
with baguette & fresh fruit #8.95
- tomato, onions & mushrooms #9.95
- avocados, onions, cheddar
cheese, nata & bell peppers #10.95
- design your own (up to #4
ingredients) #11.95

FRENCH TOAST v
sourdough bread dipped in our
french toast mix topped with fresh
strawberries, topped with powdered
sugar #11.75
"""
# long_text = "@@@ @ @ @ %%% % % % $$$ $ $ $ ^^^ ^ ^ ^ *** * * * "
# Define the number of characters per line and the number of rows
braille = brailleConsts.brailleConst

letters = " 1234567890abcdefghijklmnopqrstuvwxyz,;:..!|&* #'()?/\-"


chars_per_line = 35
rows = 22
z_height = "4.5"

cleaned = long_text.lower()
# cleaned = "".join(c.lower() for c in long_text if c.isalpha() or c.isspace())



# Calculate the maximum number of characters to print
max_chars = chars_per_line * rows

# Truncate the text if it's longer than the maximum number of characters
truncated_text = cleaned[:max_chars]

# print(truncated_text)
# print(truncated_text)

# Function to convert a number to binary and print each digit with "H" and "T"

def print_binary_with_ht(number):
    print('; нумбер = ', number)
    # if number == 0:
    if number == "0b000000":
        print('G1 X-6 F2720')
    else:
        i = 0
        # binary_representation = bin(number)[2:]  # Convert number to binary and remove '0b' prefix
        binary_representation = number[2:]
        print("; binary_representation =", binary_representation)
        # print(f"Binary representation: {binary_representation}")
        for digit in binary_representation:
            i += 1
            if digit == "1":
                print('G1 Z-', end='')
                print(z_height, 'F2720')
                print('G1 Z', end='')
                print(z_height, 'F2720')
            else:
                print('')
            if 3 != i and 6 != i:
                print('G1 Y-2.5', 'F2720')
            if 3 == i:
                print('G1 X-2.5 Y5', 'F2720')
            if 6 == i:
                print('G1 X-3.5 Y5', 'F2720')
                i = 0

        print()  # New line after printing all digits

# Loop through the truncated text and print the ASCII code of each character one by one
# for letter in letters:
#     print(ord(letter))

count = 0
# "@": "0b111111",

# for key, value in braille.items():
#     print(value[2:])

print("""
;G28 ;припарковать все оси

G21 ; set units to millimeters
G91 ; use incr coordinates

M107
G1 Z3.5 F2720
""")
# print('; Long text =', cleaned)
for char in cleaned:
    # for char in truncated_text:
    # print_binary_with_ht(ord(char))
    print_binary_with_ht(braille[char])

    count += 1
    if count % chars_per_line == 0:
        print('; New line')  # New line after every 35 characters
        print('G1 X', 6 * chars_per_line, 'Y-10', 'F2720')
    if count >= max_chars:
        break

print("""
G91 ;относительная система координат
;G1 Z1 F300 ;поднять ось Z на 1мм
;G90 ;абсолютная система координат
;G28 X0 ;припарковать ось X
M84 ;выключить моторы
""")