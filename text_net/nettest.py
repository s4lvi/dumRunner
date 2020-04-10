import socket
import common

HOST = '127.0.0.1'
PORT = 35000

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST,PORT))
while True:
    s.sendall(bytes(input("command>"), 'utf-8'))
    data = s.recv(1024)
s.close()