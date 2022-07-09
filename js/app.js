const submit = document.getElementById('submit')
const selectElm = document.getElementById('selectelm')
const timeSelect = document.getElementById('time-select')
const firstname = document.getElementById('firstname')
const kodmeli = document.getElementById('kodmeli')
const phone = document.getElementById('phone')
const phoneRegex = /09?[0-9]{2}-?[0-9]{3}-?[0-9]{4}/
const kodmeliRegex = /[0-9]{10}/
const nameRegex = /^[\u0600-\u06FF\s]+$/
let personAry = null
let itemSelected = null
let itemSelected2 = null
let itemSelected3 = null
let num = 0

function getPerson() {
    fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/${itemSelected2}.json`)
        .then(res => res.json())
        .then(person => {

            try {
                personAry = Object.entries(person)

            } catch (error) {

            }
            if (personAry === null) {
                num = 0
              
            } else {
                num = personAry.length+1
              
            }


        })


}




timeSelect.addEventListener('change', () => {

    itemSelected = timeSelect.options[timeSelect.selectedIndex].value;
   
    showData(itemSelected)

})
selectElm.addEventListener('change', () => {

    itemSelected2 = selectElm.options[selectElm.selectedIndex].value;
    itemSelected3 = selectElm.options[selectElm.selectedIndex].innerHTML;
   
    //  showData()
    getPerson()
})

submit.addEventListener('click', () => {
    if (firstname.value === '') {
        alert('لطفا نام ونام خانوادگی را وارد کنید')
    } else if (!nameRegex.test(firstname.value)) {
        alert('لطفا نام ونام خانوادگی با حروف فارسی وارد کنید')
    }


    else if (kodmeli.value === '') {
        alert('لطفا کد ملی را وارد کنید')

    } else if (!kodmeliRegex.test(kodmeli.value)) {
        alert('لطفا کد ملی را به صورت صحیح وارد کنید')
    }


    else if (!phoneRegex.test(phone.value)) {
        alert('لطفا شماره تلفن درست وارد کنید')
    }
    else if (phone.value === '') {
        alert('لطفا شماره تماس را وارد کنید')
    } else {
        check()
    }

})

async function showData(timeSelected) {




    selectElm.innerHTML = ''
    let option = document.createElement('option')
    option.innerHTML = 'انتخاب کنید'
    selectElm.append(option)

    if (timeSelected === 'AM') {
        fetch('https://aryana-f947e-default-rtdb.firebaseio.com/TakhasosAM.json')

            .then(res => res.json())
            .then(data => {

                let thakhsosData = Object.entries(data)
                thakhsosData.forEach(Data => {
                    selectElm.insertAdjacentHTML('beforeend',
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

                    selectElm.insertAdjacentHTML('beforeend',
                        ` <option value="${Data[1].nameEnglish}">${Data[1].nameFarsi}</option>`)

                })
            })


    }





}


function check() {
    if (itemSelected === null) {
        alert('لطفا تایم را انتخاب کنید')
    } else if (itemSelected2 === null) {
        alert('لطفا تخصص را انتخاب کنید')

    } else {
      if(num===30){
        alert('متاسفانه نوبتی برای فردا وجود ندارد')
      }else{
        addPerson()
      }

    }


}

async function addPerson() {

    let person = {
        name: firstname.value,
        phone: phone.value,
        kodmeli: kodmeli.value,
        nobat: num + 1,
        takhasos: itemSelected3
    }


    fetch(`https://aryana-f947e-default-rtdb.firebaseio.com/${itemSelected2}.json`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(person)
    })
        .then(res => {
            if (res.status === 200) {

                alert(' نوبت شما با موفقیت ثبت شد لطفا فردا ساعت 9 به کلینیک مراجعه کنید ')
                num++
                clearInp()


            } else {
                alert('خطا در ثبت اطلاعات لطفا مجددا سعی کنید')
                clearInp()
            }
        })
      

}



function clearInp(){
 firstname.value=''
 kodmeli.value=''
 phone.value=''

}

