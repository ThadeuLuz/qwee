VARRRD = 1


def xx():
    global VARRRD
    VARRRD += 2


xx()
xx()
print(VARRRD)
