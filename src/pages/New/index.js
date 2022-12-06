
import { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import  { useHistory, useParams } from 'react-router-dom';
import './new.css';

import { FiPlus } from  'react-icons/fi';
import { toast } from 'react-toastify';


export default function New(){

    const { id } = useParams();
    const history = useHistory();

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState(''); 

    const [idCustomer, setIdCustomer] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(()=>{
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot)=>{
                let lista = [];

                snapshot.forEach((doc)=>{
                    lista.push({
                      id: doc.id,
                      nomeFantasia: doc.data().nomeFantasia  
                    })
                })

                if(lista.length === 0){
                    console.log('Nenhuma Empresa Encontrada!!');
                    setCustomers([ { id: '1', nomeFantasia: 'Freelancer' } ]);
                    setLoadCustomers(false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomers(false);

                if(id){
                  loadId(lista);
                }
            })
            .catch((error)=>{
                console.log('Ops Algo deu Errado!!', error);
                setLoadCustomers(false);
                setCustomers([ {  id: '1', nomeFantasia: '' } ]);
            })
        }

        loadCustomers();

    }, [id]);

    async function loadId(lista){
      await firebase.firestore().collection('chamados').doc(id)
      .get()
      .then((snapshot) =>{
        setAssunto(snapshot.data().assunto);
        setStatus(snapshot.data().status);
        setComplemento(snapshot.data().complemento);

        let index = lista.findIndex(item=> item.id === snapshot.data().clienteid );
        setCustomerSelected(index);
        setIdCustomer(true);
      })
      .catch((error)=>{
        console.log('Erro no Id Passado:', error);
        setIdCustomer(false);
      })
    }

     async function handleRegister(e){
        e.preventDefault();

        if(idCustomer){
          await firebase.firestore().collection('chamados')
          .doc(id)
          .update({
            cliente: customers[customerSelected].nomeFantasia,
            clienteid: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
          })
          .then(()=>{
            toast.success('Chamado editado com sucesso!!!');
            setCustomerSelected(0);
            setComplemento('');
            history.push('/dashboard');
          })
          .catch((error)=>{
            toast.error('Erro ao efetuar o registro', error)
          })

          return;

        }

        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteid: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(()=>{
            toast.success('Chamado criado com sucesso!!!');
            setComplemento('');
            setCustomerSelected(0);
        })
        .catch((error)=>{
            toast.error('Ops erro ao registrar!!!')
           console.log(error); 
        })
        
    }

    //Chamado quando troca o Assunto
    function handleChangeSelect(e){
        setAssunto(e.target.value);
       
    }

    //Chamado quando troca o Status
    function handleOptionChange(e){
        setStatus(e.target.value);
        
    }
    //Chamdo quando troca de clente
    function handleChangeCustomers(e){
       // console.log('Index do Cliente Selecionado:', e.target.value);
       // console.log('Cliente selecionado', customers[e.target.value]);
        setCustomerSelected(e.target.value);
    }

    return(
        <div>
         <Header/>

         <div className='content'>
         <Title name='Novo Chamado'>
          <FiPlus size={25} />
        </Title>

        <div className='container'>

         <form className='form-profile' onSubmit={handleRegister}>

          <label>Clientes</label>

          {loadCustomers ? (
            <input type='text' disabled={true} value='Carregando Clientes...' />
          ) : (
            <select value={customerSelected} onChange={handleChangeCustomers}>
            {customers.map((item, index)=>{
              return(
                <option key={item.id} value={index}>
                    {item.nomeFantasia}
                </option>
              )  
            })}
            </select>
          )}


          <label>Assunto</label>
          <select value={assunto} onChange={handleChangeSelect}>
            <option value='Suporte'>Suporte</option>
            <option value='Visita Tecnica'>Visita Tecnica</option>
            <option value='Financeiro'>Financeiro</option>
          </select>

          <label>Status</label>
          <div className='status'>
            <input 
            type='radio'
            name='radio'
            value='Aberto'
            onChange={handleOptionChange}
            checked={ status === 'Aberto' }
            />
            <span>Em Aberto</span>

            <input 
            type='radio'
            name='radio'
            value='Progresso'
            onChange={handleOptionChange}
            checked={ status === 'Progresso' }
            />
            <span>Progresso</span>

            <input 
            type='radio'
            name='radio'
            value='Atendido'
            onChange={handleOptionChange}
            checked={ status === 'Atendido' }
            />
            <span>Atendido</span>
          </div>

          <label>Complemento</label>
          <textarea
          type='text'
          placeholder='Descreva seu Problema (opcional).'
          value={complemento}
          onChange={ (e)=>setComplemento(e.target.value) }
          />

          <button type='submit'>Registrar</button>

         </form>

        </div>  
         </div>
        </div>
    )
}