$(document).ready(function () {
  const buttonRegister = $("#input-register");
  const buttonStockList = $("#input-stock-list");

  buttonRegister.on("click", function () {
    const validatedProduct = validateProduct(
      "txtNameMedication",
      "txtStrengthMedication",
      "txtPackSizeMedication",
      "quantityMedication"
    );
    if (validatedProduct) {
      stockList();
    }
  });

  buttonStockList.on("click", function () {
    stockList();
  });
});

function validateProduct(idMedicationName, idStrength, idPackSize, idAmount) {
  let medication = document.getElementById(idMedicationName).value;
  let strength = document.getElementById(idStrength).value;
  let packSize = document.getElementById(idPackSize).value;
  let totalPacks = document.getElementById(idAmount).value;

  if (strength == "" || packSize == "" || totalPacks == "") {
    alert("Please fill in all fields.");
    return;
  } else {
  }

  const canAddMedicine = checkSameMedication(
    medication,
    strength,
    packSize,
    totalPacks
  );

  if (canAddMedicine) {
    registerProduct(
      medication,
      parseInt(strength),
      parseInt(packSize),
      parseInt(totalPacks)
    );
    return true;
  }
}

function checkSameMedication(medication, strength, packSize, totalPacks) {
  let select = document.getElementById("txtNameMedication");
  let medicine = select.options[select.selectedIndex].value;

  if (typeof Storage !== "undefined") {
    let medications = localStorage.getItem("medications");
    if (medications) {
      medications = JSON.parse(medications);
      const medicationAlreadyAdded = medications.some(
        (item) => item.medication === medicine
      ); // check if the medication is added already
      if (medicationAlreadyAdded) {
        alert("Medication already added to stock, please select another");
        return false;
      }
    }
    
    if (medication == "Amoxicillin" && strength != 250 && packSize != 20) {
      alert("Amoxicillin strength value has to be 250mg and pack size of 20");
      return false;
    } else if (medication == "Codeine" && strength != 30 && packSize != 10) {
      alert("Codeine strength value has to be 30mg and pack size of 10");
      return false;
    } else if (medication == "Diclofenac" && strength != 250 && packSize != 25) {
      alert("Diclofenac strength value has to be 250mg and pack size of 25");
      return false;
    } else if (medication == "Ibuprofen" && strength != 500 && packSize != 50) {
      alert("Ibuprofen strength value has to be 500mg and pack size of 50");
      return false;
    } else if (medication == "Paracetamol" && strength != 500 && packSize != 50) {
      alert("Paracetamol strength value has to be 500mg and pack size of 50");
      return false;
    } else if (medication == "Simvastatin" && strength != 10 && packSize != 10) {
      alert("Simvastatin strength value has to be 10mg and pack size of 10");
      return false;
    } else if (medication == "Tramadol" && strength != 50 && packSize != 100) {
      alert("Tramadol strength value has to be 50mg and pack size of 100");
      return false;
    } else if (medication == "Warfarin" && strength != 3 && packSize != 50) {
      alert("Warfarin strength value has to be 3mg and pack size of 50");
      return false;
    }
    console.log({ medication, strength, packSize, totalPacks });
  }

  document.getElementById("txtStrengthMedication").value = "";
  document.getElementById("txtPackSizeMedication").value = "";
  document.getElementById("quantityMedication").value = "";
  return true;
}

function registerProduct(
  medicationName,
  strengthMedication,
  packSizeMedication,
  totalPacksMedication
) {
  let newMedication = {
    medication: medicationName,
    strength: strengthMedication,
    packSize: packSizeMedication,
    totalPacks: totalPacksMedication,
  };

  if (typeof Storage !== "undefined") {
    let medications = localStorage.getItem("medications");
    if (medications == null) medications = [];
    else medications = JSON.parse(medications);
    medications.push(newMedication);
    localStorage.setItem("medications", JSON.stringify(medications));
    alert(
      `Have been successfully registered ${totalPacksMedication} packs of ${strengthMedication} mg of ${medicationName}!`
    );
  }
}

function loadStockTotal(idCampo) {
  if (typeof Storage !== "undefined") {
    let totalMedication = localStorage.getItem("totalMedication");
    if ((totalMedication = null)) totalMedication = 0;
    document.getElementById(idCampo).innerHTML = totalMedication;
  }
}

function stockList() {
  const stockList = $("#stock-list");
  if (typeof Storage !== "undefined") {
    let medications = localStorage.getItem("medications");
    if (medications == null) {
      stockList.empty();
      stockList.append(
        "<h3>There is no itens in stock. Please insert medications</h3>"
      );
    } else {
      medications = JSON.parse(medications).sort(function (a, b) {
        // sort elements alphabetically
        if (a.medication < b.medication) {
          return -1;
        }
        if (a.medication > b.medication) {
          return 1;
        }
        return 0;
      });
      let html = "";
      medications.forEach((medicine) => {
        html += `
        <tbody>
            <tr>
              <td>${medicine.medication}</td>
              <td>${medicine.strength}</td>
              <td>${medicine.packSize}</td>
              <td>${medicine.totalPacks}</td>
            </tr>
        </tbody>`;
      });
      html = `
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Strength(mg)</th>
              <th>Pack Size</th>
              <th>Total Packs</th>
            </tr>
          </thead>
          <tbody>
          ${html}
          </tbody>
        </table>`;

      stockList.empty();
      stockList.append(html);
    }
  }
}
