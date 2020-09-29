import _ from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import {
    useIsWideScreenMode,
    useStore,
    useActions,
} from '../../hooks';

function ModalInfo({
    show,
    onHide,
    title,
    children,
    animation,
    centered,
    staticModal,
    buttons,
}) {
    const wideScreenMode = useIsWideScreenMode();
    const { enabled: drawerEnabled } = useStore('drawer');
    const { hide: hideDrawer, show: showDrawer } = useActions('drawer');
    useEffect(() => {
        if (_.eq(show, true) && drawerEnabled) {
            hideDrawer();
        }
    }, [drawerEnabled, hideDrawer, show]);
    const hide = () => {
        onHide();
        if (drawerEnabled && wideScreenMode) {
            showDrawer();
        }
    };
    return (
        <Modal
            animation={animation}
            backdrop={staticModal ? 'static' : true}
            centered={centered}
            className='hover'
            onHide={hide}
            show={show}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            {!_.isEmpty(buttons) && (
                <>
                    <br />
                    <Modal.Footer>
                        {_.map(buttons, (button, index) => (
                            <Button
                                key={index}
                                {...(_.isObject(button.props) ? button.props : {})}
                                onClick={async () => {
                                    _.isFunction(button.onClick) && await button.onClick();
                                    _.eq(button.hideModal, true) && hide();
                                }}
                            >
                                {button.title}
                            </Button>
                        ))}
                    </Modal.Footer>
                </>
            )}
        </Modal>
    );
}

ModalInfo.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    animation: PropTypes.bool,
    centered: PropTypes.bool,
    buttons: PropTypes.array,
    staticModal: PropTypes.bool,
};

ModalInfo.defaultProps = {
    title: '',
    animation: true,
    centered: true,
    staticModal: false,
    buttons: [],
};

export default ModalInfo;
