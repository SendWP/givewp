<?php

namespace Give\Form\LegacyConsumer\Commands;

use Give\Framework\FieldsAPI\Form;
use Give\Form\LegacyConsumer\FieldView;

/**
 * @since 2.10.2
 */
class SetupNewTemplateHook implements HookCommandInterface {

	/**
	 * @since 2.10.2
	 *
	 * @param string $hook
	 *
	 * @return void
	 */
	public function __invoke( $hook ) {
		// On the old hook, run the new hook and render the fields.
		add_action(
			"give_$hook",
			function ( $formID ) use ( $hook ) {
				$form = new Form();
				do_action( "give_fields_$hook", $form, $formID );
				$form->walk( [ FieldView::class, 'render' ] );
			}
		);
	}
}
