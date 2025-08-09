import { Balance } from "./Balance";
import { BalanceWrapper, Card, DateWrapper, Heading } from "./styles"
import PropTypes from 'prop-types';

const options = {
  weekday: 'long',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
};

export const Account = ({ balance }) => {
    return (<Card>
        <div>
            <Heading>
                Olá, Joana! :)
            </Heading>
            <DateWrapper>
                {new Date().toLocaleDateString('pt-BR', options)}
            </DateWrapper>
        </div>
        <BalanceWrapper>
            <Balance valor={balance}/>
        </BalanceWrapper>
    </Card>)
}

Account.propTypes = {
  balance: PropTypes.number.isRequired
};