#!/usr/bin/env python

'''
Reads fastq files
Input: fastq file
Output: dictionary (Record: {'name': '@M01757:9:000000000-AN67B:1:1101:13276:1772 1:N:0:1', 'sequence': 'TGACAGGACCAGTCACGCTTTTTCTCGGAGAAGATCAAAATCTGTCGTCTTTATTGACCATATACATAGTTCAGTCGCTGTACAACACTTATCTGAAA', 'optional': '+', 'quality': '11AAAFA1AAAFGDDF11EFGGH0F300000001D1111111D22A/BAFFG2DF1211111D222D212D222D1//B//1D21B//BF1B1F2221'}
'''

import sys
import os

def process(lines=None):
    keys = ['name', 'sequence', 'optional', 'quality']
    return {key: value for key, value in zip(keys, lines)}

def read_fastq(fn):
    n = 4
    fastq_records = []
    with open(fn, 'r') as fh:
        lines = []
        for line in fh:
            lines.append(line.rstrip())
            if len(lines) == n:
                record = process(lines)
                fastq_records.append(record)
                #print("Record: %s\n" % (str(record)))
                lines = []

    return fastq_records

try:
    fn = sys.argv[1]
except IndexError as ie:
    raise SystemError("Error: Specify file name\n")

if not os.path.exists(fn):
    raise SystemError("Error: File does not exist\n")


fastq_records = read_fastq(fn)


