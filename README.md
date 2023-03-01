# Infinity Blackjack - Javascript Blackjack Game Engine 

Acest proiect a fost realizat cu scop educational in vederea intelegerii limbajului Javascript, precum
si a framework-urilor si a sistemelor de login/register folosind Node.js. Fiind un engine rulat client-side,
scopul lui este doar de testing/JS Practice

## How to play

In urma inregistrarii si a logarii pe site, jocul arata in felul urmator:

![image](https://user-images.githubusercontent.com/64250100/222103252-7ac3c24c-3314-4b85-82f8-b0735b64ec84.png)

Pentru inceperea unui joc nou, se apasa butonul start game.
Pentru a trage o carte, se apasa butonul +
Pentru a ne opri, apasam butonul -
Putem Dubla sau Imparti mana prin butoanele aferente - 2x si <>

## Prerequisites

Intrucat aplicatia web necesita o baza de date necesara si o conexiune catre un server, pentru a fi rulata aplicatia 
avem nevoie de o aplicatie precum xampp (in special pentru phpmyadmin), serverul este pornit prin intermediul node.js

```
const mysql = require('mysql');

const connection = mysql.createConnection({
	host : 'localhost',
	database : 'infinity',
	user : 'root',
	password : ''
});
```
## Supported browsers 

Aplicatia poate fi rulata prin intermediul oricarui browser cu versiunile urmatoare sau mai noi:
Edge 12, Firefox 4, Safari 3, Chrome 1

**responsive pentru orice rezolutie desktop/mobile**
