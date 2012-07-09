<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
 *
 */
class Layout {

    function render() {

        global $OUT;
        $CI = & get_instance();
        $output = $CI->output->get_output();
        if (!isset($CI->layout)) {
            $CI->layout = "default";
        }
        if ($CI->layout != false) {
            if (!preg_match('/(.+).php$/', $CI->layout)) {
                $CI->layout .= '.php';
            }

            $requested = BASEPATH . '../application/layouts/' . $CI->layout;
            $default = BASEPATH . '../application/layouts/default.php';

            if (file_exists($requested)) {
                $layout = $CI->load->file($requested, true);
            } else {
                $layout = $CI->load->file($default, true);
            }

            $view = str_replace("{content}", $output, $layout);
            $view = str_replace("{title}", $CI->title, $view);

            $scripts = "";
            $styles = "";
            $metas = "";
            if (count($CI->meta) > 0) {     // Массив с мета-тегами
                $metas = implode("\n", $CI->meta);
            }
            if (count($CI->scripts) > 0) {  // Массив со скриптами
                foreach ($CI->scripts as $script) {
                    $scripts .= "<script type='text/javascript' src='" . base_url() . "js/" . $script . ".js'></script>";
                }
            }
            if (count($CI->styles) > 0) {   // Массив со стилями
                foreach ($CI->styles as $style) {
                    $styles .= "<link rel='stylesheet' type='text/css' href='" . base_url() . "css/" . $style . ".css' />";
                }
            }

            if (count($CI->parts) > 0) {    // Массив с частями страницы
                foreach ($CI->parts as $name => $part) {
                    $view = str_replace("{" . $name . "}", $part, $view);
                }
            }
            $view = str_replace("{metas}", $metas, $view);
            $view = str_replace("{scripts}", $scripts, $view);
            $view = str_replace("{styles}", $styles, $view);
            $view = preg_replace("/{.*?}/ims", "", $view); // Подчищаем пустые неподгруженные части шаблона
        } else {
            $view = $output;
        }
        $OUT->_display($view);
    }

}

?> 