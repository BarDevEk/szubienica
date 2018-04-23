var haslo = "Bez pracy nie ma kołaczy";
haslo = haslo.toUpperCase();

var yes = new Audio("yes.wav");
var no = new Audio("no.wav");


var dlugosc = haslo.length; //ilość znaków stringa, wliczając spacje

var ile_skuch=0;

var haslo1 = "";						

// haslo, yes, no, dlugosc, ile_skuch, haslo1 to zmienne globalne

for(i=0; i<dlugosc; i++)
{
	if (haslo.charAt(i)==" ") haslo1=haslo1 + " "; 
	// traktuj wolną przestrzeń jako spację, nic tam nie wstawiaj - odstępy między   	słowami mają być zachowane
	else haslo1=haslo1 + "_";
	// jak trafisz na coś innego niż spacja to wstaw "_"
}

function wypisz_haslo()
{
	document.getElementById("plansza").innerHTML = haslo1;
	// wstaw do diva plansza w html wartość zmiennej haslo1, czyli podkreślnik zamiast liter i spację tam gdzie przerwa miedzy wyrazami; wynik tej pętli for powyżej wsadzamy do htmla, na ekranie dostaje zakreskowane podkreślnikami hasło
	
}

window.onload = start; //przy wczytaniu się strony uruchum funkcję start

var litery = new Array (35);

litery[0] = "A";
litery[1] = "Ą";
litery[2] = "B";
litery[3] = "C";
litery[4] = "Ć";
litery[5] = "D";
litery[6] = "E";
litery[7] = "Ę";
litery[8] = "F";
litery[9] = "G";
litery[10] = "H";
litery[11] = "I";
litery[12] = "J";
litery[13] = "K";
litery[14] = "L";
litery[15] = "Ł";
litery[16] = "M";
litery[17] = "N";
litery[18] = "Ń";
litery[19] = "O";
litery[20] = "Ó";
litery[21] = "P";
litery[22] = "Q";
litery[23] = "R";
litery[24] = "S";
litery[25] = "Ś";
litery[26] = "T";
litery[27] = "U";
litery[28] = "V";
litery[29] = "W";
litery[30] = "X";
litery[31] = "Y";
litery[32] = "Z";
litery[33] = "Ż";
litery[34] = "Ź";

// zmienna litery stworzona jako tablica z elementami o iteracji od 0 do 34

function start()
//funkcja, która uruchamia się po załadowaniu się strony
{
	
	var tresc_diva=""; 
	//tworzę pustą zmienną lokalną
	for(i=0;i<=34;i++)
	{
		var element="lit"+i; 	
		// tworzę zmienną lokalną, żeby uzyskać elementy o nazwach lit0, lit1, lit2 ...		
		tresc_diva=tresc_diva + '<div class ="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>'
		// modyfikuję pustą zmienną tresc_diva tak, żeby stworzyć z niej kafelki z literami alfabetu, a po kliknięciu w kafelek,
		// żeby wykonała się funkcja sprawdz()
		//onclick="sprawdz('+i+')"  -> po kliknięciu w diva wykonaj funkcję -> function sprawdz(nr), zamiast argumentu "nr" wstaw "i"
		//z pętli for
		// jako id diva przypisz wartość zmiennej "element", czyli lit0,lit1,lit2 ...
		// rezultatem diva jest i-ty elementem z tablicy zmiennej litery - A,Ą,B ...
		if((i+1)%7==0)tresc_diva = tresc_diva + '<div style="clear:both;"></div>'
		// jeśli liczba (i+1) jest podzielna przez 7 to wywołujemy clear:both; jest +1, bo pierwszy kafalek jest dla i=0
	}
	document.getElementById("alfabet").innerHTML=tresc_diva;
	//wstaw wartość "tresc_diva" do diva alfabet z html'a
	wypisz_haslo();
	// uruchom funkcję wypisz_haslo()
}

// PONIŻEJ ODSŁANIANIE LITEREK W HAŚLE SZUBIENICY

String.prototype.ustawZnak = function(miejsce,znak)
// funkcja ustawZnak ma zamienić znak w danym łańuchu na inny znak
// funckja ustawZnak jest zapisana w ten sposób, żeby móc ją później połączyć kropką z haslo1
// zmienna "miejsce" mówi, w którym miejscu będzie podmianka, zmienna "znak", jaki znak tam wstawić
{
if (miejsce > this.length -1) return this.toString();
// podajemy co się dzieje, jeśli ktoś poda wartość "miejsce" wyższą, niż długość stringa - sytuacja awaryjna
//jeśli zadeklarowana zmienna "miejsce" jest dłuższa niż length tego co będzie po lewej stronie kropki z ustawZnak (czyli haslo1)
//to zwróć tę wartość w postaci stringa
else return this.substr(0,miejsce) + znak + this.substr(miejsce + 1);
// główny cel funkcji ustawZnak - zamiana wskazanego przez zmienną "miejsce" elementu na zmienną "znak"
// return, czyli zwróć wynik
}




function sprawdz(nr)
{
	
	var trafiona = false; 
	
	for(i=0;i<dlugosc;i++)
	{
		if(haslo.charAt(i)== litery[nr]) //jeśli wartość, któregoś elementu stringa "haslo" jest równa elementowi tablicy "litery"
		{
			haslo1 = haslo1.ustawZnak(i,litery[nr]);
			// podmieniamy i-tą pozycję haslo1 na znak przechowywany w tablicy litery o indkesie [nr]
			
			trafiona = true; // jeśli jest spełniony "if" to "trafiona" jest true
		}	
	}
	
	if(trafiona == true) //jeśli trafiona jest true to dzieją się następujące instrukcje
	{
		yes.play();
		var element="lit"+nr;
		document.getElementById(element).style.background="#003300";
		document.getElementById(element).style.color="#00c000";
		document.getElementById(element).style.border="3px solid #00c000";
		document.getElementById(element).style.cursor="default";
		
		wypisz_haslo();
	}
	else //jeśli trafiona jest nie jest true to dzieją się następujące instrukcje
	{
		no.play();
		var element="lit"+nr;
		document.getElementById(element).style.background="#330000";
		document.getElementById(element).style.color="#c00000";
		document.getElementById(element).style.border="3px solid #c00000";
		document.getElementById(element).style.cursor="default";
		
		document.getElementById(element).setAttribute("onclick",";");
		
		ile_skuch++;
		// gdy trafiona nie jest true to zaczyna wzrastać wartość ile_skuch
		
		var obraz = "img/s" + ile_skuch + ".jpg";
		document.getElementById("szubienica").innerHTML='<img src="'+obraz+'"alt=""/>';
	}
	
	//wygrana - gdy wszystkie elementy haslo1 równe są haslo. Wtedy podmieniami treść diva "alfabet"
	if(haslo==haslo1)
	document.getElementById("alfabet").innerHTML = "Tak jest ! Podano prawidłowe hasło: "
	+haslo+'<br/><br/><span class="reset"onclick="location.reload()" >JESZCZE RAZ? </span>'
	
	//przegrana - gdy "trafiona" nie jest true 9 razy
	if(ile_skuch>=9)
		document.getElementById("alfabet").innerHTML = "Przegrana ! Prawidłowe hasło: "
	+haslo+'<br/><br/><span class="reset"onclick="location.reload()" >JESZCZE RAZ? </span>'
} 
































