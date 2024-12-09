<?
class FileManager
{
    public static function linkCSS($path): void
    {
        ?><link rel="stylesheet" href="<?=$path?>?<?=filemtime($_SERVER['DOCUMENT_ROOT'] . $path)?>"><?
    }
    public static function linkJS($path): void
    {
        ?><script src="<?=$path?>?<?=filemtime($_SERVER['DOCUMENT_ROOT'] . $path)?>"></script><?
    }
}
