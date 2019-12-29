#!/bin/bash
#this script will run a lot

scalability/apply-policy-of-scalability.sh scapp users-service &> hello.txt

scalability/apply-policy-of-scalability.sh scapp catalog-service &> hello.txt

scalability/apply-policy-of-scalability.sh scapp cart-service &> hello.txt

scalability/apply-policy-of-scalability.sh scapp order-service &> hello.txt

