#bash
echo $1
echo $2
SOURCE=radiancelux
EVALUATED=AngelAdell

SOURCE=$1
EVALUATED=$2

# if [[ $1 == "pasciaks" ]]; then
#    SOURCE="pasciaks"
# else
#    SOURCE="pasciaks"
# fi

# if [[ $2 == "cteriipaia" ]]; then
#    EVALUATED="cteriipaia"
# else
#    EVALUATED="cteriipaia"
# fi

rm -rf correct
git clone git@github.com:$SOURCE/codeup-web-exercises.git correct
cd correct
tree --charset=ascii > ../correct.txt
cd ..
rm -rf correct
rm -rf evaluated
git clone git@github.com:$EVALUATED/codeup-web-exercises.git evaluated
cd evaluated
tree --charset=ascii > ../evaluated.txt
cd ..
rm -rf evaluated
node compare $EVALUATED
