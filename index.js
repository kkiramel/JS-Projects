window.onload = ()=> {
    let birthMonth = document.getElementById("birth-month");
    let birthYear = document.getElementById("birth-year");
    let birthDay = document.getElementById("birth-day");
    
    let toYear = document.getElementById("to-year");
    let toMonth = document.getElementById("to-month");
    let toDay = document.getElementById("to-day");

    // The function below calculates if the year is a leap year(true) or not(false)
    let calculateLeap = (birthYear) => {
        if(birthYear % 4 === 0){
            if(birthYear % 100 === 0){
                if(birthYear % 400 === 0){
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }

    }

    // The function below finds the days based on the Month and Year; and, it changes the birth day select element
    let days = (birthMonth, isLeapYear, dayElement) => {
        let daysMonth = 0;
        switch(Number(birthMonth)){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                daysMonth = 31;
                break;
            case 2:
                daysMonth = (isLeapYear) ? 29 : 28;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                daysMonth = 30;
                break;
        }
        let day = document.getElementById(dayElement);
        day.innerHTML = "";
        let newOption = document.createElement('option');
        newOption.value = "";
        (dayElement === "birth-day") ? newOption.innerHTML = "Select your birth day" : newOption.innerHTML = "Select the day";
        day.appendChild(newOption);
        for(let i = 1; i <= daysMonth; i++){
            newOption = document.createElement('option');
            newOption.value = i;
            newOption.innerHTML = i;
            day.appendChild(newOption);
        }
    }

    let resetValues = (option) => {
        let tOption = document.createElement('option');
        let bOption = document.createElement('option');
        let bDay = document.getElementById("birth-day");
        let tDay = document.getElementById("to-day");
        switch(option){
            case "birthdate":
                document.getElementById("birth-year").value="";
                let bMonth = document.getElementById("birth-month");
                bMonth.disabled = true;
                bMonth.selectedIndex = 0;

                bDay.innerHTML = "";
                bOption.value = "";
                bOption.innerHTML = "Select your birth day";
                bDay.appendChild(bOption);
                bDay.disabled = true;
                break;
            case "todate":
                document.getElementById("to-year").value="";
                let tMonth = document.getElementById("to-month");
                tMonth.disabled = true;
                tMonth.selectedIndex = 0;
                
                tDay.disabled = true;
                tDay.innerHTML = "";
                tOption.value = "";
                tOption.innerHTML = "Select the day";
                tDay.appendChild(tOption);
                break;
            case "all":
                let aYear = document.getElementsByTagName("input");
                for(let a = 0; a < aYear.length; a++){
                    aYear[a].value = "";
                }
                
                let aMonth = document.getElementsByClassName("month");
                for(let b = 0; b < aMonth.length; b++){
                    aMonth[b].disabled = true;
                    aMonth[b].selectedIndex = 0;
                }

                bDay.disabled = true;
                bDay.innerHTML = "";
                bOption.value = "";
                bOption.innerHTML = "Select your birth day";
                bDay.appendChild(bOption);

                tDay.disabled = true;
                tDay.innerHTML = "";
                tOption.value = "";
                tOption.innerHTML = "Select the day";
                tDay.appendChild(tOption);
                break;
        }
    }
    //Upon change of year it disables the birtmonth element or if already not disabled calls the days function
    birthYear.addEventListener("change", (e) => {
        if(e.target.value === ""){
            resetValues("birthdate");
        } else {
            toYear.setAttribute("min", birthYear.value);
            (birthMonth.disabled) ? birthMonth.disabled = false : days(birthMonth.value, calculateLeap(birthYear.value), "birth-day");
        }
        
    });
    //Upon change of month, this disables the day element and calls the days function
    birthMonth.addEventListener("change", (e) => {
        document.getElementById("birth-day").disabled = false;
        days(birthMonth.value, calculateLeap(birthYear.value), "birth-day");
    });
    //Upon change of year it disables the month element or if already not disabled calls the days function
    toYear.addEventListener("change", (e) => {
        if(e.target.value === ""){
            resetValues("todate");
        } else {
            (toMonth.disabled) ? toMonth.disabled = false : days(toMonth.value, calculateLeap(toYear.value), "to-day");
        }
        
    });
    //Upon change of month, this disables the day element and calls the days function
    toMonth.addEventListener("change", (e) => {
        document.getElementById("to-day").disabled = false;
        days(toMonth.value, calculateLeap(toYear.value), "to-day");
    });

    //Resets all the values
    document.getElementById("reset-btn").addEventListener("click", () => {
        resetValues("all");
        birthYear.focus();
    });

    //Calculates the age
    document.getElementById("calculate-btn").addEventListener("click", (e) => {
        
        let calculateAge = [birthYear.value, Number(birthMonth.value), Number(birthDay.value), toYear.value, Number(toMonth.value), Number(toDay.value)];

        for(let a = 0; a < 6; a++){
            if(calculateAge[a] !== ""){
                if(a === 5){
                    e.preventDefault();
                    const oneYear = 12;
                    let ageDay = 0;
                    let ageMonth = ((oneYear - calculateAge[1]) + calculateAge[4]) - 1;
                    let ageYear = 0;

                    //calculation for days
                    if(calculateAge[2] === calculateAge[5]){
                        ageMonth++;
                        ageDay = 0;
                    } else if(calculateAge[2] > calculateAge[5]){
                        ageDay = calculateAge[5];
                    } else {
                        ageDay = calculateAge[5] - calculateAge[2];
                        ageMonth++;
                    }
                    //calculation for months
                    if(ageMonth === 12){
                        ageMonth = 0;
                        ageYear++;
                    } else if(ageMonth > 12){
                        ageMonth -= 12;
                        ageYear++;
                    }
                    ageYear = calculateAge[3] - calculateAge[0] - 1;
                    //let convertMonth = (ageYear * 12) + (ageDays)--continue here: 1 month = 30.4167
                    let monthWord = (ageMonth > 1) ? "months" : "month";
                    let dayWord = (ageDay > 1) ? "days" : "day";
                    document.querySelector(".age-result").innerHTML = `You are ${ageYear} years, ${ageMonth} ${monthWord}, and ${ageDay} ${dayWord} old.`;
                    
                }
            } else {
                break;
            }
        }
        
        
        
    });
};