import { useEffect, useState } from "react"
import http from "../../http"
import { Button } from "../Button"
import { Card, Form, Heading, Input, Label, Select } from "./styles"
import PropTypes from 'prop-types';

export const TransactionForm = ({ onFormSubmit }) => {

    const [transactionType, setTransactionType] = useState('')
    const [transactionValue, setSetTransactionValue] = useState('')

    const [transactionTypes, setTransactionTypes] = useState([])

    const createTransacion = (evt) => {
        evt.preventDefault()
        onFormSubmit(transactionType, transactionValue);
    }

    useEffect(() => {
        http.get('transaction/types')
            .then(response => setTransactionTypes(response.data))
    }, []);

    return (
        <Card>
            <Heading>
                Nova transação
            </Heading>
            <Form onSubmit={createTransacion}>
                <Select
                    value={transactionType}
                    onChange={evt => setTransactionType(evt.target.value)}
                    required
                >
                    <option value="" disabled hidden>
                        Selecione o tipo de transação
                    </option>
                    {transactionTypes.map(type => (
                        <option key={type.value} value={type.value}>
                            {type.display}
                        </option>
                    ))}
                </Select>
                <div>
                    <Label>
                        Valor
                    </Label>
                    <Input
                        placeholder="00,00"
                        type="number"
                        value={transactionValue}
                        onChange={evt => setSetTransactionValue(evt.target.value)}
                        required
                    />
                </div>
                <Button>
                    Concluir transação
                </Button>
            </Form>
        </Card>
    )
}

TransactionForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired
};