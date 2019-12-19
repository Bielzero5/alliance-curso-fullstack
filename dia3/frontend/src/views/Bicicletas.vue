<template>
  <div class="bicicletas">
    <h1>Bicicletas</h1>
    <hr />

    <b-button v-b-modal.criaBicicleta>
        <font-awesome-icon icon="plus"/><span>Adicionar</span>

    </b-button>
    <b-table striped hover :items="bicicletas" :fields="fields">
        <template slot="cell(ativo)" slot-scope="{ item: { ativo }}">
            <font-awesome-icon :icon="ativo === 'y' ? 'check' : 'times'"/>
        </template>

        <template slot="cell(actionDelete)" slot-scope="{ item: { codigo }}">
            <b-button v-on:click="excluirBiciclceta(codigo)">
                <font-awesome-icon icon="trash"/>
            </b-button>
        </template>

        <template slot="cell(actionEdit)" slot-scope="{ item }">
            <b-button v-on:click="beforeEditarBicicleta(item)">
                <font-awesome-icon icon="pen"/>
            </b-button>
        </template>

    </b-table>
    <b-modal id="criaBicicleta"
     title="Nova Bicicleta"
     ok-title="Salvar"
     cancel-title="Cancelar"
     @show="beforeNovaBicicleta"
     @ok="saveNovaBicicleta"
     >
        <FormBicicleta v-model="bicicletaAtual"/>
    </b-modal>
    <b-modal id="editarBicicleta"
    :title="'Alterar a bicicleta - ' + bicicletaAtual.codigo"
    cancel-title="Cancelar"
     @show="beforeEditarBicicleta"
     @ok="saveNovaBicicleta">
    </b-modal>

  </div>
</template>

<script>
import FormBicicleta from '../components/FormBicicleta';
import axios from 'axios'

export default {
    components: {FormBicicleta},
    data: () => {
        return {
            bicicletaAtual: {
                codigo: '',
                ativo: '',
                isNew: true
            },
            bicicletas: [],

             fields: [
                {
                    key: 'ativo',
                    label: ''
                    },
                    {
                    key: 'codigo',
                    label: 'Código'
                    },
                    {
                    key: 'actionDelete',
                    label: 'Apagar'
                    },
                    {
                    key: 'actionEdit',
                    label: 'Editar'
                    }
                ]

            }
    },

    methods: { 
        excluirBicicleta(codigo) {
            return codigo;
        },

        beforeNovaBicicleta(bicicletas) {
            this.bicicletaAtual = {
                codigo: bicicletas.codigo,
                ativo: bicicletas.ativo,
                isNew: false
            };
            this.$root.$emit('bv::show::modal', 'editaBicicleta');  
        },
            
            
        async editarBicicleta() {
            let payload = {
            ativo: this.bicicletaAtual.ativo
        };

        try {
            await axios.put(`http://localhost:3000/bicicletas/${this.bicicletaAtual.codigo}`, payload);
            await this.carregarBicicletas();
        }   
            catch(err) {
                alert('erro ao inserir a bicicleta');
            }        
        },

            async carregarBicicletas() {
            this.bicicletas.splice(0,this.bicicletas.length);
            let dados = await axios.get('http://localhost:3000/bicicletas/');
            this.bicicletas.push(...dados.data);
        },

            async saveNovaBicicleta() {
                let payload = {
                    codigo: this.bicicletaAtual.codigo,
                    ativo: this.bicicletaAtual.ativo
                };

                try {
                    await axios.post('http://localhost:3000/bicicletas', payload);
                    await this.carregarBicicletas();
                } 
               
               catch(err) {
                    alert('erro ao inserir a bicicleta');
                }        
        
            }
    },
                async mounted() {
                    await this.carregarBicicletas()
                }
}
</script>
