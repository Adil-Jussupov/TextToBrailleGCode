import brailleConsts

# Define the long text variable
long_text1 = """Adil"""

long_text3 = """this is a test
silicone      
braille       
try pocketdot """

long_text = """⠀⠀⠠⠹⠥⠗⠎⠐⠙⠀⠼⠁⠚⠸⠌⠼⠉⠁⠸⠌⠼⠃⠚⠃⠙⠀⠀⠀⠀⠀⠼⠁
⠀⠀⠠⠇⠥⠝⠡⠀⠁⠞⠀⠠⠺⠊⠇⠃⠥⠗⠀⠠⠙⠔⠬

⠀⠀⠠⠡⠊⠉⠅⠢⠀⠠⠞⠬⠁
⠀⠀⠠⠔⠛⠗⠫⠊⠢⠞⠎⠒⠀⠡⠊⠉⠅⠢⠀⠞⠬⠁⠀⠐⠣⠡⠊⠉⠅⠢⠂
⠞⠬⠁⠀⠎⠁⠥⠉⠑⠀⠨⠣⠞⠕⠍⠁⠞⠕⠑⠎⠂⠀⠛⠜⠇⠊⠉⠂
⠡⠊⠏⠕⠞⠇⠑⠀⠏⠑⠏⠏⠻⠀⠐⠣⠒⠞⠁⠔⠎⠀⠉⠕⠗⠝⠌⠜⠡⠐⠜⠂
⠃⠑⠇⠇⠀⠏⠑⠏⠏⠻⠎⠂⠀⠏⠁⠎⠊⠇⠇⠁⠀⠡⠊⠇⠊
⠏⠑⠏⠏⠻⠨⠜⠂⠀⠁⠙⠕⠃⠕⠀⠍⠜⠔⠁⠙⠑⠀⠨⠣⠉⠁⠝⠕⠇⠁
⠕⠊⠇⠂⠀⠡⠊⠇⠊⠀⠏⠪⠙⠻⠂⠀⠁⠝⠡⠕⠀⠡⠊⠇⠊⠀⠏⠪⠙⠻⠂
⠕⠝⠊⠕⠝⠂⠀⠛⠜⠇⠊⠉⠂⠀⠁⠇⠇⠎⠏⠊⠉⠑⠂⠀⠉⠇⠕⠧⠑⠂
⠉⠥⠍⠔⠀⠎⠑⠫⠂⠀⠕⠗⠑⠛⠁⠝⠕⠂⠀⠎⠁⠇⠞⠨⠜⠐⠜
⠀⠀⠠⠛⠇⠥⠞⠢⠀⠠⠋⠗⠑⠑⠀⠀⠠⠓⠁⠇⠁⠇

⠀⠀⠠⠕⠽⠌⠻⠀⠠⠍⠥⠩⠗⠕⠕⠍⠀⠈⠯⠀⠠⠡⠊⠉⠅⠏⠑⠁
⠠⠏⠊⠃⠊⠇
⠀⠀⠠⠔⠛⠗⠫⠊⠢⠞⠎⠒⠀⠕⠽⠌⠻⠀⠍⠥⠩⠗⠕⠕⠍⠂
⠡⠊⠉⠅⠏⠂⠎⠂⠀⠉⠁⠝⠕⠇⠁⠸⠌⠕⠇⠊⠧⠑⠀⠕⠊⠇⠀⠃⠇⠢⠙⠂
⠏⠊⠃⠊⠇⠀⠎⠁⠥⠉⠑⠀⠐⠣⠛⠜⠇⠊⠉⠂⠀⠕⠝⠊⠕⠝⠂
⠉⠥⠍⠔⠂⠀⠕⠗⠑⠛⠁⠝⠕⠂⠀⠁⠡⠊⠕⠞⠑⠀⠏⠁⠌⠑⠂
⠁⠇⠇⠎⠏⠊⠉⠑⠂⠀⠕⠗⠁⠝⠛⠑⠀⠚⠥⠊⠉⠑⠂⠀⠇⠊⠍⠑⠂
⠉⠔⠝⠁⠍⠕⠝⠂⠀⠛⠗⠨⠙⠀⠉⠇⠕⠧⠑⠐⠜
⠀⠀⠠⠍⠁⠙⠑⠀⠕⠝⠀⠩⠜⠫⠀⠑⠟⠥⠊⠏⠰⠞⠀⠾
⠠⠠⠠⠉⠕⠉⠕⠝⠥⠞⠂⠀⠑⠛⠛⠂⠀⠋⠊⠩⠂⠀⠍⠊⠇⠅⠂
⠏⠂⠝⠥⠞⠎⠂⠀⠎⠑⠎⠁⠍⠑⠂⠀⠩⠑⠇⠇⠋⠊⠩⠂⠀⠎⠕⠽⠂                 
"""
# Define the number of characters per line and the number of rows
braille = brailleConsts.brailleConst

chars_per_line = 32
rows = 25
z_dippen = "1.5"       # depth of embossing in millimeters

feedrate = 'F2500'      # feedrate for X and Y axis
zFeedrate = 'F50'     # feedrate for Z axis

cleaned = long_text.lower()

# Calculate the maximum number of characters to print
max_chars = chars_per_line * rows


# function for adding gcode for embossing a dot
def embose():
    print('*')
    print('G1 Z-', end='')
    print(z_dippen, zFeedrate)
    print('G1 Z', end='')
    print(z_dippen, zFeedrate)

# function for embossing a braille character
def printBraille(char):
    binaryChar = char[2:]
    # print(char, end='')
    # print(binaryChar, 'Received Braille =', binaryChar)
    i = 1
    for digit in binaryChar:
        print('; Dot', i, '- ', end='')
        if (digit == '1'):
            embose()
        else:
            print('0')

        if (i == 3):
            print('G1 X-2.5 Y5', feedrate)      # moving to the dot-4 of current char
        elif (i == 6):
            print('\n; Next character')
            print('G1 X-3.5 Y5', feedrate, end='')      # moving to the dot-1 of the next char
        else:
            print('G1 Y-2.5', feedrate)         # moving to the next dot of current char
        i += 1
    print()

def printChar(inputChar):
    # function for printing each character
    if inputChar == '\n':       # case of reaching a new line
        print('; New line')     # adding comment to the Gcode
        print('G1 X', end='')
        print(chars_per_line * 6,'Y-10', feedrate)
        # print(braille[inputChar])
        # print(inputChar)
    elif inputChar == ' ':
        print('G1 X-6', feedrate)
    else:
        printBraille(braille[inputChar])
        # printBraille(inputChar)

print(brailleConsts.startGCode)

# !NEED to add pause for and adjusting the level of clay thickness

for char in cleaned:
    printChar(char)

print(brailleConsts.endGCode)