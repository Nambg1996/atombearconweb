

import Swal from "sweetalert2";

//npm install sweetalert2


export const alertSucess = (title) => {

   // alertSucess('データ更新成功')

    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 2000
      })
    
}



export const  alertFail = (title) => {

    //alertFail('フィールドにいくつかの特殊文字があります')

    Swal.fire({
        icon: 'error',
        title: 'おっとっと...',
        text: title,
        footer: '<a href=""></a>'
      })  
    
}


export const alertConfirm = (ffc) => {

  Swal.fire({
    title: '本気ですか？',
    text: "これを元に戻すことはできません",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'はい、消去',
    cancelButtonText: "キャンセル",  
  }).then((result) => {
    if (result.isConfirmed) {
      ffc()
      
    }
  })

  
}


export const alertConfirmSetting = (ffc) => {

  Swal.fire({
    title: '本気ですか？',
    text: "これを元に戻すことはできません",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'はい、OK',
    cancelButtonText: "キャンセル",  
  }).then((result) => {
    if (result.isConfirmed) {
      ffc()
      
    }
  })

  
}




export const showInputfield = (ffc) => {



  Swal.fire({
    title: 'ビーコンを名前で登録',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: '登録',
     cancelButtonText: "キャンセル",  
    showLoaderOnConfirm: true,
    preConfirm: (inputvalue) => {

      ffc(inputvalue)
    },
    
  })
  
}




 