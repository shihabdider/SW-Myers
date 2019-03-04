# Run benchmark test and generate tsv (to change number of tests modify script,
# default is 20)

python benchmark_wrapper.py sequence.fasta Ecoli-DH10B-pESBL4-T7.fastq

# Generate graph from tsv data

python make_bm_plot.py 
