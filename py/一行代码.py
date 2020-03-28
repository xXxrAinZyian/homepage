# 一行代码打印爱心
print('\n'.join([''.join(['ILoveYou'[(x - y) % 8] if (x * 0.04) ** 2 + ((y * 0.1) - ((x * 0.04) ** 2) ** (1 / 3)) ** 2 < 1 else ' ' for x in range(-30, 30, 1)]) for y in range(15, -15, -1)]))


