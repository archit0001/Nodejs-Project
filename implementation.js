/**
 * Code by
 * Name: Archit Anghan
 * StudentID: 040916799
 * 
 * To display record,save records,edit record,delete record and show bar chart from simple data structure(array) from 13100262.csv
 * By using some advance topics, Inheritance and generics 
 */

//Module for make interaction between user and programme 
const readline = require('readline-sync');
//Module to work with files
const fs = require("fs");
var choice = 0;
var subChoice1 = 0;
var subChoice2 = 0;
var allRecord = [];
var columnName = [];
var genArrayColunmRecords = [];

//read the data from CSV file and convert all data to string and store into array 
try {
  var arrayColunmRecords = fs.readFileSync('13100262.csv').toString().split(/\r?\n|\r/);

} catch (error) {
  console.error("Something went wrong with CSV file");
}

columnName = arrayColunmRecords[0].split(",");


class operation {

  //Function to set record into array
  setRecord() {

    if (fs.existsSync('savedRecord.csv')) {
      try {
        genArrayColunmRecords = fs.readFileSync('savedRecord.csv').toString().split("\n");

      } catch (error) {
        console.error("Something went wrong with CSV file");
      }
    }

    for (let i = 1, j = arrayColunmRecords.length - 1; i < j; i++) {
      allRecord.push(arrayColunmRecords[i].split(","));
    }
    for (let i = 0, k = allRecord.length; i < k; i++) {
      for (let j = 0, l = columnName.length; j < l; j++) {
        (allRecord[i])[j] = (allRecord[i])[j].replace(/"/g, "");
      }
    }
    return allRecord;
  }

  //function to get records
  getRecord(subChoice1, subChoice2) {

    this.setRecord();

    if (subChoice1 === undefined && subChoice2 === undefined) {
      for (let i = 0, j = allRecord.length; i < j; i++) {
        console.log((i + 1) + "." + allRecord[i] + "\n");
      }
    } else if (subChoice2 === undefined) {
      subChoice2 = subChoice1;

      for (let i = subChoice1 - 1, j = 0; i <= subChoice2 - 1; i++) {
        j = 0;
        while (j < columnName.length) {
          console.log(columnName[j] + ":- " + allRecord[i][j]);
          j++;
        }
        console.log("\n");
      }
    } else {

      for (let i = subChoice1 - 1, j = 0; i <= subChoice2 - 1; i++) {
        j = 0;
        while (j < columnName.length) {
          console.log(columnName[j] + ":- " + allRecord[i][j]);
          j++;
        }
        console.log("\n");
      }
    }
  }
}

class implementation extends operation {

  //Functoin to save record in new file
  saveRecord(subChoice1) {
    this.setRecord();
    if (!fs.existsSync('savedRecord.csv')) {
      fs.writeFileSync('savedRecord.csv', columnName.toString());
    }

    if (!genArrayColunmRecords.includes(arrayColunmRecords[subChoice1])) {
      fs.appendFileSync('savedRecord.csv', "\n" + arrayColunmRecords[subChoice1]);
      console.log("Your record is saved in savedRecord file\n BY ARCHIT ANGHAN \n");
    }
    else {
      console.log("Your record is already existed in savedRecord file\n BY ARCHIT ANGHAN \n");
    }
  }

  //Function to edit record and save in existed file
  editRecord(subChoice1, subChoise2, newValue) {
    this.setRecord();
    (allRecord[subChoice1 - 1])[subChoise2 - 1] = newValue;
    if (!fs.existsSync('savedRecord.csv')) {
      fs.writeFileSync('savedRecord.csv', columnName.toString());
    }
    fs.appendFileSync('savedRecord.csv', "\n" + allRecord[subChoice1 - 1]);
  }

  //Function to delete record 
  deleteRecord(subChoice1) {
    if (subChoice1 > 0 && subChoice1 < genArrayColunmRecords.length) {
      genArrayColunmRecords.splice(subChoice1, 1);
      fs.writeFileSync('savedRecord.csv', columnName.toString());
      console.log("\nTotal number of records after delete record: " + (genArrayColunmRecords.length - 1) + "\nYour record is deleted");
    } else {
      console.log("\nRecord that you want to delete is not exist");
      return false;
    }
    for (let i = 1, j = genArrayColunmRecords.length; i < j; i++) {
      fs.appendFileSync('savedRecord.csv', "\n" + genArrayColunmRecords[i])
    }
  }

  //Function to make histogram 
  getChart(subChoice1, subChoice2) {
    let star;
    let word;
    this.setRecord();
    for (let i = 0; i < allRecord.length; i++) {
      const spaceWord = allRecord[0][5] + "                    ";
      if ((allRecord[i]).includes(subChoice1) && (allRecord[i]).includes(subChoice2)) {
        word = (allRecord[i])[5] + "(" + (allRecord[i])[12] + "%)";

        for (let j = 0; j < spaceWord.length; j++) {
          if (word.length != spaceWord.length) {
            word = word + " ";
          }
        }
        star = "";
        for (let s = 0; s < parseInt((allRecord[i])[12]); s++) {
          star = star + "*";
        }
        console.log(word + "|" + star);
      }

    }

  }
}


//Object of child class
var impl = new implementation();

while (choice < 7) {
  if (allRecord.length > 30) {
    allRecord = [];
  }

  console.log("1.Show All Record\n2.Show Record Of Your Choice\n3.Save Record in CSV file\n4.Edit And Save The Record\n5.Delete The Record\n6.Data Chart\n7.Exit");
  choice = readline.question("Enter your choice: ");


  //Conditional statement block
  switch (choice) {

    //Case to show all records
    case '1':

      impl.getRecord();
      console.log(" BY ARCHIT ANGHAN \n");
      break;

    //Case for fetching records
    case '2':

      console.log("Access The Records You Want\n");
      subChoice1 = readline.question("From: ");
      subChoice2 = readline.question("To: ");

      impl.getRecord(subChoice1, subChoice2);
      console.log(" BY ARCHIT ANGHAN \n");
      break;

    //Case for saving record in CSV file
    case '3':

      console.log("Save The Record You Want\n");
      subChoice1 = readline.question("Enter the record number: ");

      impl.saveRecord(subChoice1);
      break;

    //case for edit a record
    case '4':

      subChoice1 = readline.question("Enter The number Of Record You Want Edit: ");
      subChoice2 = readline.question("Enter The number Of Column You Want Edit: ");
      let newValue = readline.question("\nEnter New Value: ");
      impl.editRecord(subChoice1, subChoice2, newValue);
      console.log("Record Edited\n BY ARCHIT ANGHAN \n");

      break;

    //Case for delete a record
    case '5':
      impl.setRecord();

      if (genArrayColunmRecords.length <= 1) {
        console.log("There is no record in file to delete");
        break;
      }

      console.log("Total number of records: " + (genArrayColunmRecords.length - 1));
      subChoice1 = readline.question("Enter The Record number You Want Delete: ");
      impl.deleteRecord(subChoice1);
      console.log("\nBY ARCHIT ANGHAN ");
      break;

    //Case for presenting bar chart
    case '6':
      console.log("Select the gender\n[Males OR Females]");
      subChoice1 = readline.question("Gender type here: ");
      console.log("Select the age group\n[11 years, 13 years, 15 years]");
      subChoice2 = readline.question("Age group type here: ");
      impl.getChart(subChoice1, subChoice2);
      console.log("\nInfo: Graph shows one star per 1 percent\n BY ARCHIT ANGHAN\n");
      break;


    //Case to exit
    case '7':
      console.log(".......Bye.......\n BY ARCHIT ANGHAN ");
      break;
  }
}
