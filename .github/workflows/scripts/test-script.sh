PARAM_1=0
PARAM_2=1

echo "param_1=$PARAM_1" >> $GITHUB_OUTPUT
echo "param_2=$PARAM_2" >> "$GITHUB_OUTPUT" # Checking if wrapping quotes are working as well