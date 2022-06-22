//IIFE
(async () => {

    //Carga la página principal
    window.addEventListener('load', (event) => {
        getUsers()
    })

    //Obtiene y muestra a los usuarios
    const getUsers = async() => {
        //Obtiene a los usuarios
        let users = localStorage.getItem('users')
        //Valida si hay informacion en el localstorage
        if(!users) users = (await setUsers())

        //Muestra a los usuarios
        let content = ''
        JSON.parse(users).forEach(element => {
            content += `<user-element class='card-user' element=${JSON.stringify(element)}></user-element>`
        })
        document.getElementById('table-user').innerHTML = content
    }

    //Llama al api para traer la data de los usuarios
    const setUsers = async() => {
        const userListOne = fetch('https://reqres.in/api/users?page=1').then(res => res.json())
        const userListTwo = fetch('https://reqres.in/api/users?page=2').then(res => res.json())       
        //Llama a los 2 apis de forma paralela
        return (await Promise.all([userListOne, userListTwo]).then(result => {
            const filter = result.map(x => x.data)
            const join = JSON.stringify([].concat.apply([], filter))
            //Guarda la lista en el localstorage
            localStorage.setItem('users', join)
            return join
        }))
    }
})()