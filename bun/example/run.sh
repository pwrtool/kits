#!/bin/bash

current_directory=`pwd`

# Run the script from the directory it is in
cd "$(dirname "$0")"


# Run the index.ts file
# It's common to do cwd=$PWD to pass the current working directory to the script
bun run ./index.ts $1 $2 $3 $4 $5 $6 $7 $8 $9 
