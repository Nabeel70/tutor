<?php
if (!empty($field['options'])) {
    $field_id = 'field_' . $field['key'];
    $saved_data = $this->get($field['key'], array());
    ?>
    <div class="tutor-option-field-row d-block" id="<?php echo $field_id; ?>">
        <?php include tutor()->path . "views/options/template/field_heading.php"; ?>

        <div class="tutor-option-field-input">
            <div class="type-check d-block">
                <?php foreach ($field['options'] as $optionKey => $option) : ?>
                    <?php $_checked = '1' === $saved_data[ $optionKey ] ? 'checked="checked"' : ''; ?>
                    <div class="tutor-form-check">
                        <input type="checkbox" id="check_<?php echo $optionKey ?>_<?php echo $field['key'] ?>" name="tutor_option[<?php echo $field['key'] ?>][<?php echo $optionKey; ?>]" value="1" <?php echo $_checked; ?> class="tutor-form-check-input" />
                        <label for="check_<?php echo $optionKey ?>_<?php echo $field['key'] ?>"> <?php echo $option; ?> </label>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <?php 
}
