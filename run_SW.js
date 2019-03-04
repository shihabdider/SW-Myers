const SWaligner = require('../graphic-smith-waterman/src/index')
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

const microtime = require('microtime')
const totTimeStart = microtime.nowDouble()

//const defaultAligner = SWaligner();
const customAligner = SWaligner({
  gapScoreFunction: k => -k,
  gapSymbol: '-',
})

const customResult = customAligner.align(ref, target);
//console.log(customResult.alignment)

const runTime = microtime.nowDouble() - totTimeStart
console.log(runTime)



