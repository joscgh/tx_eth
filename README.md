# tx_eth
Puede funcionar con red privada o con la red principal de Ethereum
si quieres  una red privada he aqui como hacerlo https://ethereumchile.cl/2017/09/29/crea-tu-propia-blockchain-privada-con-ethereum/

se debe tener el puerto 8546 para websocket ya que funciona con wbesocket
para inicializar la red privada despues de seguir los pasos con el link anterior

geth --datadir "BlockchainETHCL" --networkid 65535 --nodiscover console --rpc --rpcaddr "127.0.0.1" --rpcport "8545" --rpccorsdomain "*" --shh --ws --wsaddr "127.0.0.1" --wsport "8546" --wsorigins '*' --wsapi "personal,admin,db,eth,net,web3,miner,shh,txpool,debug" --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3"

luego de tener la red funcionando se inicilaiza el cliente

geth attach ipc:\\.\pipe\geth.ipc
