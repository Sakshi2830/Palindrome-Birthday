function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
  }
  
  function isPalindrome(str){
    var reverse = reverseStr(str);
    return str === reverse;
  }
  
  function convertDateToStr(date){
    var dateStr = { day: '', month: '', year: ''};
  
    if(date.day < 10){
      dateStr.day = '0' + date.day
    }
    else{
      dateStr.day = date.day.toString();
    }
  
      if(date.month < 10){
      dateStr.month = '0' + date.month
    }
    else{
      dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr
  }
  
  
  function getAllDateFormat(date){
    var dateStr = convertDateToStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return[ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy,mmddyy, yymmdd];  ;
  }
  
  
  
  function checkPalindromeForAllDateFormat(date){
     var listOfPalindrome = getAllDateFormat(date)
  
     var flag = false;
  
     for(var i = 0; i< listOfPalindrome.length; i++){
       if(isPalindrome(listOfPalindrome[i])){
         flag = true;
       }
     }
  
     return flag;
  }
  
  
  //to check if the dsired year is leap year or not....
  function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false
    }
    if (year % 4 === 0){
      return true;
    }
    return false;
  }
  
  function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //No. of days in every months
  
  //check of february
    if(month === 2){
      //check for leap year.....
      if(isLeapYear(year)){
        if(day>29){
          day = 1;
          month++
        }
      }
      else{
        if(day > 28){
          day = 1;
          month++
  
        }
      }
    }
    //check for other months.....
    else{
      //check if the day exceeds the max days in the month
      if(day > daysInMonth[month - 1]){
        day = 1;
        month++
      }
    }
  //increment the year if month is graeter than 12
    if(month > 12){
      month = 1;
      year++
    }
    return{
      day:day,
      month:month,
      year:year
    }
  }
  
  function getNextDatePalindrome(date){
    var ctr = 0;
    var nextDate = getNextDate(date)
  
  
    while(1){
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormat(nextDate);
  
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate]
  }
  
  function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }
  
  function getPreviousPalindromeDate(date) {
    var previousDate = getPreviousDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = getDateAsString(previousDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
  }
  
  var datInputRef = document.querySelector('#bday-input');
  var showBtnRef = document.querySelector('#show-button')
  var resultRef = document.querySelector('#result')
  function clickHandler(e) {
   var bdayStr = datInputRef.value
  
   if(bdayStr !== ''){
     var listOfDate = bdayStr.split('-');
     var date = {
       day: Number(listOfDate[2]),
       month: Number(listOfDate[1]),
       year: Number(listOfDate[0])
     }
    var isPalindrome = checkPalindromeForAllDateFormat(date)
   if(isPalindrome){
     resultRef.innerText = 'yay! your birthday is Palindrome 🥳🥳🎈🎈'
   }
   else{
     var[ctr,nextDate] = getNextDatePalindrome(date)
     resultRef.innerText = ` Ohh! You missed it 😥😥..The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You missed by ${ctr} days!`
   }
   }
  }
  
  showBtnRef.addEventListener('click', clickHandler)
  
  
  