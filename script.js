
var birthDate = document.querySelector("#date")

var checkBtn = document.querySelector("#btn")

var output = document.querySelector("#output")

function reverseStr(str) {
    /* var listOfChar = str.split('');
    
    var listOfCharRev = listOfChar.reverse();

    var reversedStr = listOfCharRev.join('') */

    return str.split('').reverse().join('');
}

function isPalindrome(str) {

    var rev = reverseStr(str);

    return str === rev
    
}

function convertDateToString(date) {
    
    var dateStr = { day: '', month: '', year: ''}

    if(date.day < 10)
    dateStr.day = '0' + date.day.toString();

    else
    dateStr.day = date.day.toString();

    if(date.month < 10)
    dateStr.month = '0' + date.month.toString();

    else
    dateStr.month = date.month.toString();


    dateStr.year = date.year.toString();

    return dateStr;
}

var date = {
    day: 31,
    month: 12,
    year: 2020
}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;

    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;

    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;

    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);

    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);

    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return([ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd])

}

function checkPalindromeForAllFormats(date) {
    var listOfPalindromes = getAllDateFormats(date)

    var isDatePalindrome = false;

    for(var i = 0; i<listOfPalindromes.length; i++)
    {
        if(isPalindrome(listOfPalindromes[i]))
        {
            isDatePalindrome = true;
            break;
        }
    }

    return isDatePalindrome;
}


function isLeapYear(year) {
    if(year % 400 === 0)
    {
        return true;
    }
    if(year % 100 === 0)
    {
        return false;
    }
    if(year % 4 === 0)
    {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;


    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(month === 2) //For feb
    {
        if(isLeapYear(year)) //check for leap year
        {
            if(day>29)
            {
                day = 1;
                month++;
            }
        }
        else
        {
            if(day>28)
            {
                day = 1;
                month++;
            }
        }
    }
    else    //For rest of the months
    {
        if(day > daysInMonth[month - 1]) //If next date is exceeding 31 or 30 depending on the month
        {
            day = 1;
            month++;
        }
    }

    if(month > 12)
    {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getNextPalindromeDate(date) {

    var ctr = 0;
    var nextDt = getNextDate(date)

    while(1)
    {
        ctr++;
        var isPalin = checkPalindromeForAllFormats(nextDt)
        if(isPalin)
        {
            break;
        }
        nextDt = getNextDate(nextDt)
    }
    return [ctr, nextDt];
}

function clickHandler() {

    var bdayStr = birthDate.value;
    
    if(bdayStr !== '')
    {
        var listOfDate = bdayStr.split('-')

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllFormats(date)
        if(isPalindrome)
        output.innerHTML = "Yay, its a palindrome"
        else
        {
            var [ctr, nextdate] = getNextPalindromeDate(date)
            output.innerHTML = `The next palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year}. You missed it by ${ctr} days`
        }
    }

    else{
        output.innerHTML = "Please enter a valid input"
    }
    
}

//console.log(getNextPalindromeDate(date))

checkBtn.addEventListener("click", clickHandler)