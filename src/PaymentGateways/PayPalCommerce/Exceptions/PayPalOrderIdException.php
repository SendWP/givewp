<?php
namespace Give\PaymentGateways\PayPalCommerce\Exceptions;

use Give\Framework\Exceptions\Primitives\Exception;

/**
 * @unreleased
 */
class PayPalOrderIdException extends Exception
{
    public function __construct($message = "", $code = 0, $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
