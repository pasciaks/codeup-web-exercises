while read line
do

echo $line
./clonescript.sh radiancelux $line

done < list.txt