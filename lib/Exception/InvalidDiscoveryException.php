<?php

namespace OCA\Richdocuments\Exception;

use OCP\HintException;

class InvalidDiscoveryException extends HintException {

	public function __construct($hint = '', $code = 0, \Exception $previous = null) {
		parent::__construct('Unable to handle discovery response', $hint, $code, $previous);
	}

}
