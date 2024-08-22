# brailleConsts.py
# file to store Braille vars and constants

brailleConst = {
    "#": "0b001111",
    "C": "0b000001",

    "1": "0b100000",
    "2": "0b110000",
    "3": "0b100100",
    "4": "0b100110",
    "5": "0b100010",
    "6": "0b110100",
    "7": "0b110110",
    "8": "0b110010",
    "9": "0b010100",
    "0": "0b010110",

    "a": "0b100000",
    "b": "0b110000",
    "c": "0b100100",
    "d": "0b100110",
    "e": "0b100010",
    "f": "0b110100",
    "g": "0b110110",
    "h": "0b110010",
    "i": "0b010100",
    "j": "0b010110",

    "k": "0b101000",
    "l": "0b111000",
    "m": "0b101100",
    "n": "0b101110",
    "o": "0b101010",
    "p": "0b111100",
    "q": "0b111110",
    "r": "0b111010",
    "s": "0b011100",
    "t": "0b011110",

    "u": "0b101001",
    "v": "0b111001",
    "w": "0b101101",
    "x": "0b101111",
    "y": "0b101011",
    "z": "0b111101",

    ".": "0b111101",
    ",": "0b111101",
    "!": "0b111101",
    "?": "0b111101",
    ";": "0b111101",
    ":": "0b111101",
    "-": "0b111101",
    "'": "0b111101",
    "(": "0b111101",
    ")": "0b111101",
    "/": "0b111101",

    # test letters
    "@": "0b111111",
    "%": "0b111000",
    "$": "0b000111",
    "^": "0b101010",
    "*": "0b010101",
    "&": "0b010101",
    "~": "0b010101",

    "\n": "0b000000",

    # Space
    " ": "0b000000"
}

brailleConst1 = {
    "#": "#",
    "C": "C",

    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",

    "a": "a",
    "b": "b",
    "c": "c",
    "d": "d",
    "e": "e",
    "f": "f",
    "g": "g",
    "h": "h",
    "i": "i",
    "j": "j",

    "k": "k",
    "l": "l",
    "m": "m",
    "n": "n",
    "o": "o",
    "p": "p",
    "q": "q",
    "r": "r",
    "s": "s",
    "t": "t",

    "u": "u",
    "v": "v",
    "w": "w",
    "x": "x",
    "y": "y",
    "z": "z",

    ".": ".",
    ",": ",",
    "!": "!",
    "?": "?",
    ";": ";",
    ":": ":",
    "-": "-",
    "'": "'",
    "(": "(",
    ")": ")",
    "/": "/",

    # test letters
    "@": "@",
    "%": "%",
    "$": "$",
    "^": "^",
    "*": "*",
    "&": "&",
    "~": "~",

    "\n": "NL",

    # Space
    " ": " "
}

startGCode = """
; generated by Adil - Braille mold maker

M73 P0 R609
M73 Q0 S611
M201 X1000 Y1000 Z200 E5000 ; sets maximum accelerations, mm/sec^2
M203 X200 Y200 Z12 E120 ; sets maximum feedrates, mm/sec
M204 S1250 T1250 ; sets acceleration (S) and retract acceleration (R), mm/sec^2
M205 X8.00 Y8.00 Z0.40 E4.50 ; sets the jerk limits, mm/sec
M205 S0 T0 ; sets the minimum extruding and travel feed rate, mm/sec

;TYPE:Custom
M862.3 P "MK3S" ; printer model check
M862.1 P0.4 ; nozzle diameter check
M115 U3.13.3 ; tell printer latest fw version
G90 ; use absolute coordinates
G28 W ; home all without mesh bed level
G80 X80.612 Y66.0709 W91.6428 H91.6253 ; mesh bed levelling

G1 Z15 F720
G1 X220 Y220 F1000 ; go to the first top right corner to start printing

G91 ; use relative coordinates
G21 ; set units to millimeters
M107 ; Fan off
"""

endGCode = """
M204 S1000
;TYPE:Custom

G1 Z50 F720 ; Move print head up
G1 X0 Y200 F3600 ; park

G4 ; wait

M84 ; disable motors
"""