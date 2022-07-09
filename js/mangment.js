

const $ = document
const addRecord = $.getElementById('btn-record')
const inpFarsi = $.getElementById('inp-farsi')
const inpEnglish = $.getElementById('inp-english')
const btnDeleteRecord = $.getElementById('btn-delete-record')
const btnDeleteAll = $.getElementById('btn-delete-all')

const tahoasosContanir = $.getElementById('tahoasos-contanir')
const timeSelectAdd = $.getElementById('time-select')
const timeSelectDelete = $.getElementById('time-select-delete')
const timeSelectNobatha = $.getElementById('time-select-nobatha')
const takhasosSelectNobatha = $.getElementById('takhasos-select-nobatha')
const personContiner = $.getElementById('person-container')
const farsiRegex= /^[\u0600-\u06FF\s]+$/
const englishRegex=/^[a-zA-Z0-9]*$/
takhasosID = null
let itemSelectedDelete = null
let itemSelected = null


timeSelectAdd.addEventListener('change', () => {

    itemSelected = timeSelectAdd.options[timeSelectAdd.selectedIndex].value;
    console.log(itemSelected);


})
timeSelectDelete.addEventListener('change', () => {
    showDataDelete()
})
btnDeleteRecord.addEventListener('click', showDataDelete)

addRecord.addEventListener('click', () => {
    if (itemSelected === null) {

        alert('لطفا تایم را انتخاب کنید')


    } else {
        if (inpFarsi.value === '') {
            alert('لطفا نام فارسی را وارد کنید')

        }else if(!farsiRegex.test(inpFarsi.value)){
                alert('لطفا با حروف فارسی تایپ کنید')
        }
        
        else if (inpEnglish.value === '') {
            alert('لطفا نام انگلیسی را وارد کنید')
        }else if(!englishRegex.test(inpEnglish.value)){

                alert(' لطفا نام انگلیسی را با حروف انگلیسی وارد کنید')
        }
        
        else {
            addTakhasos(itemSelected)
        }
    }


})


function clearInp() {
    inpEnglish.value = ''
    inpFarsi.value = ''
}



function addTakhasos(timeData) {



    let Takhasos = {
        nameFarsi: inpFarsi.value,
        nameEnglish: `${inpEnglish.value}${timeData}`

    }
    if (timeData === 'AM') {

        fetch('https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosAM.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(Takhasos)
        })
            .then(res => {
                if (res.status === 200) {

                    alert('اطلاعات با موفقیت ثبت شد')
                    createTable(itemSelected)
                    clearInp()
                } else {
                    alert('خطا در ثبت اطلاعات لطفا مجددا سعی کنید')
                }
            })


    } else {
        fetch('https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosPM.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(Takhasos)
        })
            .then(res => {
                if (res.status === 200) {
                    alert('اطلاعات با موفقیت ثبت شد')
                    createTable(itemSelected)
                    clearInp()
                } else {
                    alert('خطا در ثبت اطلاعات لطفا مجددا سعی کنید')
                }
            })


    }





}

// for show record for delete



async function showDataDelete() {

    itemSelectedDelete = timeSelectDelete.options[timeSelectDelete.selectedIndex].value;


    tahoasosContanir.innerHTML = ''

    if (itemSelectedDelete === 'AM') {
        fetch('https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosAM.json')

            .then(res => res.json())
            .then(data => {
                console.log(data);
                thakhsosData = Object.entries(data)
                thakhsosData.forEach(Data => {

                    tahoasosContanir.insertAdjacentHTML('beforeend', `  <div class="row">
                <div class="d-flex justify-content-between ">
                    <div class=" mt-3"  onclick="deleteTakhasos('${Data[0]}'),deleteTable('${Data[1].nameEnglish}')" >
                        <img class="img" src="/img/ictrash-bi.png" alt="">
                    </div>
    
                    <div class="mt-3">
                        <h6>${Data[1].nameFarsi}</h6>
                    </div>
    
                </div>
    
            </div>
    
            <hr>`)
                })
            })


    }
    else {
        fetch('https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosPM.json')

            .then(res => res.json())
            .then(data => {

                thakhsosData = Object.entries(data)
                console.log(thakhsosData);
                thakhsosData.forEach(Data => {

                    tahoasosContanir.insertAdjacentHTML('beforeend', `  <div class="row">
                <div class="d-flex justify-content-between ">
                    <div class=" mt-3" onclick="deleteTakhasos('${Data[0]}'),deleteTable('${Data[1].nameEnglish}')" >
                        <img class="img" src="/img/ictrash-bi.png" alt="">
                    </div>
    
                    <div class="mt-3">
                        <h6>${Data[1].nameFarsi}</h6>
                    </div>
    
                </div>
    
            </div>
    
            <hr>`)
                })
            })


    }





}

async function deleteTakhasos(id) {
    takhasosID = id

    if (itemSelectedDelete === 'AM') {
        await fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosAM/${takhasosID}.json`,
            {
                method: 'DELETE'
            }).then(res => {
                alert('تخصص با موفقیت حذف شد')
            })

        showDataDelete()

    } else {
        await fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosPM/${takhasosID}.json`,
            {
                method: 'DELETE'
            }).then(res => {

            })
        showDataDelete()
    }




}
function deleteTable(tableName) {

    fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/${tableName}.json`,
        {
            method: 'DELETE'
        }).then(res => {

        })


}

function createTable(timeType) {
    let newTable = {
        name:'تست',
        phone:'0',
        kodmeli: 0,
        nobat:1,
        takhasos: '0'

    }
    fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/${inpEnglish.value}${timeType}.json`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newTable)

    })

}


// for show record

let selectedNobatTime = null
let selectedTakhasos = null

timeSelectNobatha.addEventListener('change', () => {

    selectedNobatTime = timeSelectNobatha.options[timeSelectNobatha.selectedIndex].value;
  
    showData(selectedNobatTime)


})
takhasosSelectNobatha.addEventListener('change', () => {

    selectedTakhasos = takhasosSelectNobatha.options[takhasosSelectNobatha.selectedIndex].value;

    showPerson()


})


async function showData(timeSelected) {




    takhasosSelectNobatha.innerHTML = ''
    let option = document.createElement('option')
    option.innerHTML = 'انتخاب کنید'
    takhasosSelectNobatha.append(option)

    if (timeSelected === 'AM') {
        fetch('https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosAM.json')

            .then(res => res.json())
            .then(data => {

                let thakhsosData = Object.entries(data)
                thakhsosData.forEach(Data => {
                    takhasosSelectNobatha.insertAdjacentHTML('beforeend',
                        ` <option value="${Data[1].nameEnglish}">${Data[1].nameFarsi}</option>`)


                })

            })


    }
    else {
        fetch('https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosPM.json')

            .then(res => res.json())
            .then(data => {

                thakhsosData = Object.entries(data)
              
                thakhsosData.forEach(Data => {

                    takhasosSelectNobatha.insertAdjacentHTML('beforeend',
                        ` <option value="${Data[1].nameEnglish}">${Data[1].nameFarsi}</option>`)

                })

            })


    }





}

function showPerson() {


    personContiner.innerHTML = ''
    fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/${selectedTakhasos}.json`)
        .then(res => res.json())
        .then(data => {

           try {
            let personlist = Object.entries(data)
            
            personlist.forEach(data => {
                personContiner.insertAdjacentHTML('afterbegin',
                    `    <div class="d-flex  justify-content-between ">

                   
                    <div class="mt-3">
                        <h6>${data[1].kodmeli}</h6>
                    </div>
                    <div class="mt-3">
                        <h6>${data[1].phone}</h6>
                    </div>
                    <div class="mt-3">
                        <h6>${data[1].name}</h6>
                    </div>
                    <div class="nubat align-content-center">
                        <h1>${data[1].nobat}</h1>
                    </div>
                </div>
                <hr>`)

            })

            
           } catch (error) {
            
           }
        })

}



function deleteallPM(){

  try {
    
    fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosPM.json`)
    .then(res => res.json())
    .then(data => {

     let pmtakhasos= Object.entries(data)
    
     pmtakhasos.forEach(data=>{


        fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/${data[1].nameEnglish}.json`,
        {
            method: 'DELETE'
        }).then(res => {

            if (res.status === 200) {

                alert('حذف با موفقیت انجام شد ')
               


            } else {
                alert('خطا در حذف اطلاعات لطفا مجددا سعی کنید')
               
            }

        })

     })

    })
  } catch (error) {
    
  }

   


}
function deleteallAM (){


  try {
    fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosAM.json`)
    .then(res => res.json())
    .then(data => {

     let AMtakhasos= Object.entries(data)
    
     AMtakhasos.forEach(data=>{


        fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/${data[1].nameEnglish}.json`,
        {
            method: 'DELETE'
        }).then(res => {


            if (res.status === 200) {

                alert('حذف با موفقیت انجام شد ')
               


            } else {
                alert('خطا در حذف اطلاعات لطفا مجددا سعی کنید')
               
            }
        })

     })

    })
  } catch (error) {
    
  }
  

}