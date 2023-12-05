#!/bin/bash

for i in {4..25}
do
  mkdir -p "${1}/day${i}" && cd "${1}/day${i}" && touch input.txt question.txt question_1.ts question_2.ts && cd "../.."
done
