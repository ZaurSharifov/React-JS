import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropdownItem, DropdownMenu, DropdownToggle, NavItem, UncontrolledDropdown, NavLink, Badge } from 'reactstrap'
import { bindActionCreators } from 'redux';
import * as cartActions from '../../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import alertify from 'alertifyjs';


class CartSummary extends Component {

    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + "sepetten silindi")
    }

    renderEmpty() {
        return (
            <NavItem>
                <NavLink>Sepetiniz bos</NavLink>
            </NavItem>
        );
    }

    renderSummary() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Sepetiniz</DropdownToggle>
                <DropdownMenu right>
                    {
                        this.props.cart.map(cartItem => (
                            <DropdownItem key={cartItem.product.id}><Badge color="danger" onClick={()=>this.removeFromCart(cartItem.product)}>-</Badge>{cartItem.product.productName}<Badge color="success">{cartItem.quantity}</Badge></DropdownItem>
                        ))
                    }
                    <DropdownItem divider />
                    <DropdownItem><Link to={"/cart"}>Sepete git</Link></DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    render() {
        return (
            <div>
                {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
            </div>
        )
    }
}
function mapDispatchToProps(dispatch){
    return{
        actions:{
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}
function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartSummary);