const fs = require('fs');

const program = require('commander');

program
    .option('-r, --ref [ref_seq]', 'Ref sequence path')
    .option('-t, --target [target_file]', 'Target sequence path')
    .parse(process.argv);

const ref_path = program.ref
const target_path = program.target

const ref = fs.readFileSync(ref_path, 'utf-8');
//console.log(ref);

const target = fs.readFileSync(target_path, 'utf-8');
//console.log(target);

const myers_cost = function Myers_Cost(A, B, w) {
    // Lengths of sequences
    M = 0
    N = 0

    if (A.length > B.length) {
        M = A.length
        N = B.length
    } else {
        M = B.length
        N = A.length
    }

    // Gap penalties 
    g = 2   // Gap open
    h = 0.5 // Gap extend

    //Init vectors and scalars
    const CC = []
    const DD = []

    var e = 0
    var c = 0
    var s = 0
    var t = 0

    CC[0] = 0

    t = g 

    for (j = 1; j <= N; j++) {
        t += h
        CC[j] = t
        DD[j] = t + g
        }
    t = g
    for (i = 1; i <= M; i++) {

        s = CC[0]

        t += h
        c = t
        CC[0] = c
        e = t + g

        for (j = 1; j <= N; j++) {
            e = Math.min(e, c+g) + h
            DD[j] = Math.min(DD[j], CC[j] + g) + h
            c = Math.min(DD[j], e, s + w(A[i], B[j]) )
            s = CC[j]
            CC[j] = c
        }
    }
    return CC[N]
    }

const microtime = require('microtime')
const totTimeStart = microtime.nowDouble()

const sub_matrix = (a_i, b_j) => (a_i === b_j ? 2 : -1)

const result = myers_cost(ref, target, sub_matrix)

const runTime = microtime.nowDouble() - totTimeStart
console.log(runTime)



