/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";

import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
import { CodeBlock } from "@ckeditor/ckeditor5-code-block";
import type { EditorConfig } from "@ckeditor/ckeditor5-core";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { FindAndReplace } from "@ckeditor/ckeditor5-find-and-replace";
import { FontColor, FontFamily, FontSize } from "@ckeditor/ckeditor5-font";
import { Heading, Title } from "@ckeditor/ckeditor5-heading";
import { Highlight } from "@ckeditor/ckeditor5-highlight";
import { HorizontalLine } from "@ckeditor/ckeditor5-horizontal-line";
import { HtmlEmbed } from "@ckeditor/ckeditor5-html-embed";
import { GeneralHtmlSupport } from "@ckeditor/ckeditor5-html-support";
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  ImageResizeButtons,
  ImageResizeEditing,
} from "@ckeditor/ckeditor5-image";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { AutoLink, Link, LinkImage } from "@ckeditor/ckeditor5-link";
import { List, ListProperties, TodoList } from "@ckeditor/ckeditor5-list";
import { MediaEmbed, MediaEmbedToolbar } from "@ckeditor/ckeditor5-media-embed";
import { Mention } from "@ckeditor/ckeditor5-mention";
import { PageBreak } from "@ckeditor/ckeditor5-page-break";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { RemoveFormat } from "@ckeditor/ckeditor5-remove-format";
import { SelectAll } from "@ckeditor/ckeditor5-select-all";
import { ShowBlocks } from "@ckeditor/ckeditor5-show-blocks";
import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";
import {
  SpecialCharacters,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
} from "@ckeditor/ckeditor5-special-characters";
import { Style } from "@ckeditor/ckeditor5-style";
import {
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
} from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Undo } from "@ckeditor/ckeditor5-undo";
import { Base64UploadAdapter } from "@ckeditor/ckeditor5-upload";
import { WordCount } from "@ckeditor/ckeditor5-word-count";

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
  public static override builtinPlugins = [
    Alignment,
    AutoImage,
    AutoLink,
    Autoformat,
    Base64UploadAdapter,
    BlockQuote,
    Bold,
    CloudServices,
    Code,
    CodeBlock,
    Essentials,
    FindAndReplace,
    FontColor,
    FontFamily,
    FontSize,
    GeneralHtmlSupport,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlEmbed,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageResizeEditing,
    ImageResizeButtons,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    MediaEmbedToolbar,
    Mention,
    PageBreak,
    Paragraph,
    PasteFromOffice,
    RemoveFormat,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Style,
    Subscript,
    Superscript,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Title,
    TodoList,
    Underline,
    Undo,
    WordCount,
  ];

  public static override defaultConfig: EditorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "style",
        "|",
        "bold",
        "italic",
        "underline",
        "specialCharacters",
        "pageBreak",
        "code",
        "|",
        "selectAll",
        "fontSize",
        "fontFamily",
        "findAndReplace",
        "showBlocks",
        "-",
        "fontColor",
        "strikethrough",
        "superscript",
        "subscript",
        "horizontalLine",
        "removeFormat",
        "|",
        "link",
        "imageInsert",
        "insertTable",
        "|",
        "mediaEmbed",
        "highlight",
        "codeBlock",
        "blockQuote",
        "htmlEmbed",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
        "|",
        "sourceEditing",
      ],
      shouldNotGroupWhenFull: true,
    },
    language: "en",
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
        "linkImage",
      ],
      resizeOptions: [
        {
            name: 'resizeImage:original',
            value: null,
            label: 'Original'
        },
        {
            name: 'resizeImage:10',
            value: '10',
            label: '10%'
        },
        {
            name: 'resizeImage:20',
            value: '20',
            label: '20%'
        },
        {
            name: 'resizeImage:30',
            value: '30',
            label: '30%'
        },
        {
            name: 'resizeImage:40',
            value: '40',
            label: '40%'
        },
        {
            name: 'resizeImage:50',
            value: '50',
            label: '50%'
        },
        {
            name: 'resizeImage:60',
            value: '60',
            label: '60%'
        },
        {
            name: 'resizeImage:70',
            value: '70',
            label: '70%'
        },
        {
            name: 'resizeImage:80',
            value: '80',
            label: '80%'
        },
        {
            name: 'resizeImage:90',
            value: '90',
            label: '90%'
        },
    ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableCellProperties",
        "tableProperties",
      ],
    },
  };
}

export default Editor;
