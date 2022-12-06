import { useState } from 'react';
import './customers.css';
import Title from'../../components/Title';
import Header from'../../components/Header';
import firebase from '../../services/firebaseConnection';
import { FiUser } from 'react-icons/fi';

import { toast } from 'react-toastify';


export default function Customers(){
    const [nomeFantasia,setNomeFantasia] = useState('');
    const [cnpj,setCnpj] = useState('');
    const [endereço,setEndereço] = useState('');

   async function handleAdd(e){
        e.preventDefault();
        
        if(nomeFantasia!== '' && cnpj!== '' && endereço!== '' ){
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereço: endereço
            })
            .then(()=>{
             setNomeFantasia('');
             setCnpj('');
             setEndereço('');
             toast.info('Empresa Cadastrada!!!')
            })
            .catch((error)=>{
                console.log(error);
                toast.error('Erro ao cadastrar sua empresa!!')
            })
        }else{
            toast.error('Preencha todos os campos!')
        }
    }

    return(
        <div>
        <Header/>
  
         <div className='content'>
            <Title name='Clientes'>
              <FiUser size={25} />  
            </Title>  

            <div className='container'>
            <form className='form-profile customers' onSubmit={handleAdd}>
             <lable>Nome Fantasia</lable>
             <input type='text' placeholder='Nome da Empresa' value={nomeFantasia} onChange={(e)=> setNomeFantasia(e.target.value)} />

             <lable>Cnpj</lable>
             <input type='text' placeholder ='Seu CNPJ' value={cnpj} onChange={(e)=> setCnpj(e.target.value)} />

             <lable>Endereço</lable>
             <input type='text' placeholder='Endereço da Empresa' value={endereço} onChange={(e)=> setEndereço(e.target.value)} />

             <button type='submit'>Cadastrar</button>

            </form>   
            </div>  
        </div>


        </div>
    )
}