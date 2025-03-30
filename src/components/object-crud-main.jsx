import React, { useState } from 'react'
import { ListPersons } from './ListPersons';

export const Object_crud_main = () => {
    const [firstName,setfirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [myList,setMyList] = useState([]);
    const [editId,seteditId] = useState(null)
    const handleSave = ()=>{
        setfirstName(firstName);
        setLastName(lastName);
        const id = crypto.randomUUID();
        const isExist = myList.some(person =>person.First === firstName && person.Last ===lastName)
        if(!isExist){
            if(editId){
              let editObj = myList.find(x=>x.Id === editId);
              setMyList(myList.map((person)=>{
                if(person.Id === editId){

                    return {...person,First:firstName,Last:lastName}
                }
                return person
              }))
            }
            else{
                if(firstName && lastName){
            setMyList([...myList, {Id:id,First:firstName,Last:lastName}]);
                }
            }
            setfirstName("");
            setLastName("");
            seteditId("");
        }
    }
    const hanleEdit =(id)=>{
        seteditId(id);
       let editObj = myList.find(x=>x.Id == id);
       setfirstName(editObj.First);
       setLastName(editObj.Last);

    }
    console.log("myListmain",myList)

  return (
    <>
    <h3>Main</h3>
    <input type='text' placeholder='enter First name' value={firstName} onChange={(e)=>setfirstName(e.target.value)}></input> <br></br>
    <input type='text' placeholder='enter Last name' value={lastName} onChange={(e)=>setLastName(e.target.value)}></input>  <br></br>
    <button onClick={handleSave}>{editId? 'Update': 'Save'}</button> <br></br>
   {
  myList.length > 0 &&
    <ListPersons myList = {myList} setMyList = {setMyList} hanleEdit = {hanleEdit} ></ListPersons>
   }

    </>
)
}
