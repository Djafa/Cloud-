#!/bin/bash

#we first need to check wether or not the output file that we create already exists or not, if yes, we need to delete it
FILE=curl-output.txt
if [ -f "$FILE" ]; then
    rm -r curl-output.txt
fi

echo "=====================================================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "================product-catalog======================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "" >> curl-output.txt #This is a jump line equivalent to the \n
echo "=======================POST==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X POST --data "name=kiwi&price=1.74&image=https://www.alimentarium.org/fr/system/files/thumbnails/image/alimentarium_kiwis.jpg&category=fruit" $1:4000/catalog/admin >> curl-output.txt


echo "" >> curl-output.txt
echo "=======================GET==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X GET $1:4000/catalog/kiwi/admin >> curl-output.txt
echo "" >> curl-output.txt

echo "" >> curl-output.txt
echo "=======================PUT==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X PUT --data "price=2.74&image=https://www.alimentarium.org/fr/system/files/thumbnails/image/alimentarium_kiwis.jpg&category=fruit" $1:4000/catalog/kiwi/admin >> curl-output.txt
echo "" >> curl-output.txt

echo "" >> curl-output.txt
echo "=======================DELETE==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X DELETE $1:4000/catalog/kiwi/admin >> curl-output.txt >> curl-output.txt
echo "" >> curl-output.txt

echo "" >> curl-output.txt


echo "=====================================================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "======================================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "" >> curl-output.txt #This is a jump line equivalent to the \n
echo "=======================POST==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X POST --data "username=kevin&orders=pomme&totalItems=1&totalAmount=1" $1:6000/history >> curl-output.txt

echo "" >> curl-output.txt
echo "=======================GET==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X GET $1:6000/history/kevin >> curl-output.txt
echo "" >> curl-output.txt

echo "" >> curl-output.txt
echo "=======================PUT==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X PUT --data "orders=kiwi&totalItems=1&totalAmount=2" $1:6000/history/kevin >> curl-output.txt
echo "" >> curl-output.txt

echo "" >> curl-output.txt

echo "=====================================================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "================cart-service======================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "" >> curl-output.txt #This is a jump line equivalent to the \n
echo "=======================POST==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X POST --data "username=kevin&products=pomme&totalItems=4&totalAmount=6,78&category=fruit" $1:5000/cart >> curl-output.txt

echo "" >> curl-output.txt
echo "=======================GET==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X GET $1:5000/cart/kevin >> curl-output.txt

echo "" >> curl-output.txt

echo "" >> curl-output.txt
echo "=======================PUT==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X PUT --data "products=pomme&totalItems=5&totalAmount=7,78&category=fruit" $1:5000/cart/kevin >> curl-output.txt
echo "" >> curl-output.txt

echo "" >> curl-output.txt
echo "=======================DELETE==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X DELETE $1:5000/cart/kevin >> curl-output.txt
echo "" >> curl-output.txt

echo "" >> curl-output.txt

echo "=====================================================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "==========================users======================" >> curl-output.txt
echo "==================test with non admin account========" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "" >> curl-output.txt #This is a jump line equivalent to the \n
echo "=======================POST==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X POST --data "username=kevin&password=pain" $1:3000/user >> curl-output.txt

echo "" >> curl-output.txt
echo "=======================GET==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X GET $1:3000/user/kevin/pain >> curl-output.txt
echo "" >> curl-output.txt

echo "" >> curl-output.txt

echo "=====================================================" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "==========================users======================" >> curl-output.txt
echo "==================test with admin account============" >> curl-output.txt
echo "=====================================================" >> curl-output.txt
echo "" >> curl-output.txt #This is a jump line equivalent to the \n
echo "=======================POST==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X POST --data "username=admin&password=admin" $1:3000/user >> curl-output.txt

echo "" >> curl-output.txt
echo "=======================GET==========================" >> curl-output.txt
echo "" >> curl-output.txt

curl -X GET $1:3000/user/admin/admin >> curl-output.txt
echo "" >> curl-output.txt

echo "" >> curl-output.txt

