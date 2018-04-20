pragma solidity ^0.4.0;

contract Carro{
    string modelo;
    string matricula;
   
   function setCarro(string _modelo, string _matricula) public{
       modelo = _modelo;
       matricula = _matricula;
   }
   
   function getCarro() public constant returns (string, string){
       return (modelo, matricula);
   }
}