import React, { useState } from 'react'
import db from '../db.json'
import './Main.css'
function Main() {  
    //aktualna strona
    const [site, SetSite] = useState(0);
    const RegisterPlace=[]; // tablica
    const [place,] = useState(db);     
    const [Reg, SetReg] = useState(); 
    
    var tablica = [];
    

    // sprwadzanie wymiarów miejsc do rezerwacji i pobieranie z pliku lub localu
    if (!localStorage.getItem("place")) {
        console.log('brak danych  w localstorage');

        let maxX=0;
        let maxY=0;   
        
        
        for (var i =0; i < place.seats.length; i++){
            if (maxX<place.seats.[i].cords.x){
                maxX=place.seats.[i].cords.x
            }
            if (maxX<place.seats.[i].cords.y){
                maxY=place.seats.[i].cords.y
            }
        }   
    
        console.log(localStorage.getItem("place"));
        
        //zapisywanie bazy do tabeli
    
        for (var index = 0; index <= maxX; index++) {
            tablica[index] = [];
        }
        for (var k = 0; k <= maxX; k++) {
            for (var j = 0; j <= maxY; j++) {         
                tablica[k][j] = null ;
            }
        }   

        for (let index = 0; index < place.seats.length; index++) {
            tablica[place.seats[index].cords.x][place.seats[index].cords.y] = place.seats[index].reserved 
        }

        localStorage.setItem('place', JSON.stringify(tablica))
        console.log('pobrano dane z pliku');
        
    }else{
        console.log('pobrane dane z locala');
        tablica= JSON.parse(localStorage.getItem("place"))
    }
    
    
    //zaznaczanie i zapisywanie miejsca 
    const chosePlace = (e)=>{            
        if (RegisterPlace.length===0 )(                
            Reg.forEach(element => {
                RegisterPlace.push(element)
            })
        )    

         if (!RegisterPlace.find(RegisterPlace => RegisterPlace ===e.target.id)) {
            RegisterPlace.push(e.target.id)            
            document.getElementById(e.target.id).className='nr chose'; 
         }else{             
            let index = RegisterPlace.findIndex(RegisterPlace => RegisterPlace ===e.target.id);
            RegisterPlace.splice(index, 1)
            document.getElementById(e.target.id).className='nr'; 
        }

        console.log(RegisterPlace);       
        
    }

    const Save = (e)=>{
        e.preventDefault()

        if (RegisterPlace.length===0 )(                
            Reg.forEach(element => {
                RegisterPlace.push(element)
            })
        )

        RegisterPlace.forEach(element => {
            let x = (element.split(',').[0]);
            let y = (element.split(',').[1]);            
            tablica[x][y]=true
            
            // console.log(tablica[x][y]);
            localStorage.setItem('place', JSON.stringify(tablica))
            SetReg(RegisterPlace)            
            SetSite(2)
        });

    }
    //losowanie miejsc
    const RandomPlace = (e) => {
        let placeF =[];
        let placeT =[];
        let count =0;

        const Active = (a)=>{
            console.log(a);
            if (e.target.count.value>a.length) {
                console.log(a.length,'wielkosc');                
                alert('Brak wymaganej ulości miejsc')
            }else{
                setTimeout(() =>{a.forEach(element => {
                    let x = (element.split(',').[0]);
                    let y = (element.split(',').[1]);
                    document.getElementById(y+','+x).className='nr chose';
                });}, 200)
                set(e,1,);
            }            
    }
        
        e.preventDefault();    
        
        for (let i = 0; i < tablica.length; i++) { 
            if (count===parseInt(e.target.count.value)) {
                break
            }
            count=0
            placeF=[]  
            console.log('reset rząd',i);         
            for (let j = 0; j < tablica.[i].length; j++) {                 
                if (tablica[i][j]===false) {
                    placeF.push(i+','+j)

                    if (placeT.length<e.target.count.value) {
                        placeT.push(i+','+j)
                    }
                    count++;                    
                    if (count===parseInt(e.target.count.value)) {             
                        break
                    }
                }else{
                    count=0
                    placeF=[]                   
                }                          
            }                        
        }
        
        // if (placeT.length>=e.target.count.value || placeF.length>=e.target.count.valuendition) {
        //     console.log('brak miejsc');
        // }
        
               
       if (count===parseInt(e.target.count.value)) {
        SetReg(placeF)
        Active(placeF)
       }else{
        SetReg(placeT)
        Active(placeT)
        if (e.target.near.checked) {
            alert('nie udało sie wyszukac miejsc obok siebie')
        }        
       }    

       
        
        
        
    }

    //przejscia między stronami
    const set = (e, nr) =>{
        e.preventDefault(); 
        SetSite(nr) 
    }

    return (
        <div>            
            <div className={site===0? 'show, form': 'no_show'}>
                    
                    <form onSubmit={(e) => RandomPlace(e, 1)}>
                        Liczba miejsc:<input type='number' name='count' required></input><br></br>              
                        <input type='checkbox'  name='near' ></input>Czy miejsca mają być obok siebie?<br></br>
                        <button className={'button_reg'} type='submit'  >Wybierz miejsca</button>
                    </form>
            </div>
            <div key={Math.random()} className={site===1? 'show, choise': 'no_show'}>
                    
                    {place.length===0? 
                    'brak miejsc'
                    :               
                        tablica.map((pl, x) =>(
                            
                            <div key={x} >
                                {pl.map((el, y) =>(                                    
                                    <div key={Math.random()} 
                                    id={[y,x]} 
                                    className={`nr ${tablica[x][y]===null? 'unvisible' : ''} 
                                    ${tablica[x][y]? 'busy' : ''}` }
                                    
                                    
                                    onClick={tablica[x][y]? null : e=>(chosePlace(e))}
                                    > 
                                    {tablica[x][y]===null? 
                                    ''
                                    :
                                        tablica[x][y]? 
                                        ''
                                        :
                                        ''
                                    }
                                    </div>
                                   
                                ))
                                }
                                
                            </div>
                            
                            
                        ))
                    
                    }
                    <div className={'history'}>
                        <div className={'box'}>
                            <div className={'icon '}></div>
                            <div className={'text'}>Miejsca dostępne</div>
                        </div>

                        <div className={'box'}>
                            <div className={' icon busy'}></div>                        
                            <div className={'text'}>Miejsca zarezerowane</div>
                        </div>

                        <div className={'box'}>
                            <div className={'icon  chose'}></div>                        
                            <div className={'text'}>Twój wybór</div>
                        </div>
                        
                        
                        <div className={'button'} onClick={(e)=> Save(e)}>Rezerwuj</div>                        
                        
                        
                    </div>
            </div>
            <div className={site===2? 'show, info': 'no_show'}>
                    Twoja rezerwacja przebiegła pomyślnie!<br></br>
                    <br></br>
                    Wybrane miejsca<p></p>
                    {Reg? 
                    
                
                    Reg.length===0? 
                    'tak'
                    :
                    Reg.map((item, index) =>(
                        <div key={item}>- rząd x{item.split(',').[0]}, 
                        miejsce y{item.split(',').[1]} (id{index+1})</div>
                    ))
                    
                
                : 
                'Brak zarezerwowanych terminów'
                    }
            </div>
        </div>
    )
}

export default Main
