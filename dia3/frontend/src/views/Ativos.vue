<template>
  <div class="ativos">
    <h1>Ativos</h1>
    <hr />
    <b-button v-b-modal.criarAtivos>
       <font-awesome-icon icon="plus" /> <span>Adicionar</span>
    </b-button>
    <b-table striped hover :items="ativos" :fields="fields">
        <template slot="cell(actionDelete)" slot-scope="{ item }">
            <b-button v-on:click="excluirAtivos(item)">
                <font-awesome-icon icon="trash" />
            </b-button>
        </template>
        <template slot="cell(actionEdit)" slot-scope="{ item }">
            <b-button v-on:click="beforeEditaAtivos(item)">
                <font-awesome-icon icon="pen" />
            </b-button>
        </template>
    </b-table>
    <b-modal id="criarAtivos"
        title="Novo ativo"
        ok-title="Salvar"
        cancel-title="Cancelar"
        @show="beforeNovoAtivos"
        @ok="saveNovoAtivos">
        <FormAtivos v-model="ativosAtual"/>
    </b-modal>
    
    
    <b-modal id="editaAtivos"
        :title="'Alterar o ativo - ' + ativosAtual.codigo"
        ok-title="Alterar"
        cancel-title="Cancelar"
        @ok="editarAtivos">
        <FormAtivos v-model="ativosAtual"/>
    </b-modal>

    

  </div>
</template>

<script>
import FormAtivos from '../components/FormAtivos';
import axios from 'axios';

export default {
    components: {FormAtivos},
    data: () => {
        return {
            ativosAtual: {
                codigo: '',
                ativo: '',
                isNew: true
            },
            ativos: [],
            fields: [
                {
                    key: 'descricao',
                    label: 'Descrição'
                },
                {
                    key: 'codigo',
                    label: 'Código'
                },
                {
                    key: 'actionDelete',
                    label: 'Deletar'
                },
                {
                    key: 'actionEdit',
                    label: 'Editar'
                }
            ]
        }
    },
    methods: {
        beforeEditaAtivos(ativos) {
            this.ativosAtual = {
                codigo: ativos.codigo,
                descricao: ativos.descricao,
                isNew: ativos.isNew
            }
            this.$root.$emit('bv::show::modal', 'editaAtivos');
        },

        async excluirAtivos(ativos) {
            try {
                await axios.delete(`http://localhost:3000/ativos/${ativos.codigo}`);
                await this.carregaAtivos();
            } catch(err) {
                alert('erro ao atualizar os ativos');
            }
        },
        async editarAtivos() {
           let payload = {
                descricao: this.ativosAtual.descricao
            };

            try {
                await axios.put(`http://localhost:3000/ativos/${this.ativosAtual.codigo}`, payload);
                await this.carregaAtivos();
            } catch(err) {
                alert('erro ao atualizar os ativos');
            }
        },
        async carregaAtivos() {
            this.ativos.splice(0, this.ativos.length);
            let dados = await axios.get('http://localhost:3000/ativos/');
            this.ativos.push(...dados.data);
        },
        beforeNovoAtivos() {
            this.ativosAtual.codigo = '';
            this.ativosAtual.descricao = '';
            this.ativosAtual.isNew = true;
        },
        async saveNovoAtivos() {
            let payload = {
                codigo: this.ativosAtual.codigo,
                descricao: this.ativosAtual.descricao
            };

            try {
                await axios.post('http://localhost:3000/ativos/', payload);
                await this.carregaAtivos();
            } catch(err) {
                alert('erro ao inserir os ativos');
            }
        }
    },
    async mounted() {
        await this.carregaAtivos();
    }
}
</script>