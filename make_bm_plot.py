#!/usr/bin/env python

'''
Makes a nice bar histogram that averages and displays the benchmark data

Input: TSV file with all the benchmark data
Output: An image with the graph
'''

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.cbook as cbook
import pandas 

# Get all the means and stds across the runtimes for each file over the random
# intervals

bm_df = pandas.read_table('Myers_Cost_benchmark.tsv')
#bm_df.to_latex('cram_js_runtime.tex')

print ('Building figure...')

fig, ax = plt.subplots()
ax.scatter(bm_df['Length(N)'], bm_df['Time'], alpha=0.5)

ax.set_xlabel('Length (N)', fontsize=15)
ax.set_ylabel('Time (s)', fontsize=15)
ax.set_title('Myers Cost Benchmark')

ax.grid(True)
fig.tight_layout()

fig.savefig('benchmark_data_graph.png', format='PNG')
plt.show()
