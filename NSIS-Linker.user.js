// ==UserScript==
// @name         NSIS-Linker.user.js
// @author       Jan T. Sott
// @namespace    http://nsis.sf.net/GreaseMonkey_UserScript
// @version      0.2
// @date         2013-05-27
// @description  Links NSIS commands found on certain webpages to the scripting reference
// @include      http://forums.winamp.com/*
// @include      https://forums.winamp.com/*
// @include      http://nsis.sourceforge.net/*
// @include      https://nsis.sourceforge.net/*
// @include      http://nsis.sf.net/*
// @include      https://nsis.sf.net/*
// @include      https://nsis.sf.net/*
// @include      http://stackoverflow.com/*
// ==/UserScript==

/*

  Author:        Jesse Ruderman (original AutoLink script) - http://www.squarefree.com/
                 Jan T. Sott (NSIS Linker script) - http://whyeye.org
      
  License:       MPL, GPL, LGPL

*/

const timeBefore = new Date();


// FILTERS

var docs_url = "http://nsis.sourceforge.net/Reference/"

const filters = [
  {
    name: "NSIS Wiki",
    regexp: /\bAbort\b|\bAddBrandingImage\b|\bAddSize\b|\bAllowRootDirInstall\b|\bAllowSkipFiles\b|\bAutoCloseWindow\b|\bBGFont\b|\bBGGradient\b|\bBrandingText\b|\bBringToFront\b|\bCall\b|\bCallInstDLL\b|\bCaption\b|\bChangeUI\b|\bCheckBitmap\b|\bClearErrors\b|\bCompletedText\b|\bComponentText\b|\bCopyFiles\b|\bCRCCheck\b|\bCreateDirectory\b|\bCreateFont\b|\bCreateShortCut\b|\bDelete\b|\bDeleteINISec\b|\bDeleteINIStr\b|\bDeleteRegKey\b|\bDeleteRegValue\b|\bDetailPrint\b|\bDetailsButtonText\b|\bDirText\b|\bDirVar\b|\bDirVerify\b|\bEnableWindow\b|\bEnumRegKey\b|\bEnumRegValue\b|\bExch\b|\bExec\b|\bExecShell\b|\bExecWait\b|\bExpandEnvStrings\b|\bFile\b|\bFileBufSize\b|\bFileClose\b|\bFileErrorText\b|\bFileOpen\b|\bFileRead\b|\bFileReadByte\b|\bFileReadUTF16LE\b|\bFileReadWord\b|\bFileWriteUTF16LE\b|\bFileSeek\b|\bFileWrite\b|\bFileWriteByte\b|\bFileWriteWord\b|\bFindClose\b|\bFindFirst\b|\bFindNext\b|\bFindWindow\b|\bFlushINI\b|\bGetCurInstType\b|\bGetCurrentAddress\b|\bGetDlgItem\b|\bGetDLLVersion\b|\bGetDLLVersionLocal\b|\bGetErrorLevel\b|\bGetFileTime\b|\bGetFileTimeLocal\b|\bGetFullPathName\b|\bGetFunctionAddress\b|\bGetInstDirError\b|\bGetLabelAddress\b|\bGetTempFileName\b|\bGoto\b|\bHideWindow\b|\bIcon\b|\bIfAbort\b|\bIfErrors\b|\bIfFileExists\b|\bIfRebootFlag\b|\bIfSilent\b|\bInitPluginsDir\b|\bInstallButtonText\b|\bInstallColors\b|\bInstallDir\b|\bInstallDirRegKey\b|\bInstProgressFlags\b|\bInstType\b|\bInstTypeGetText\b|\bInstTypeSetText\b|\bIntCmp\b|\bIntCmpU\b|\bIntFmt\b|\bIntOp\b|\bIsWindow\b|\bLangString\b|\bLicenseBkColor\b|\bLicenseData\b|\bLicenseForceSelection\b|\bLicenseLangString\b|\bLicenseText\b|\bLoadLanguageFile\b|\bLockWindow\b|\bLogSet\b|\bLogText\b|\bManifestDPIAware\b|\bManifestSupportedOS\b|\bMessageBox\b|\bMiscButtonText\b|\bName\b|\bNop\b|\bOutFile\b|\bPage\b|\bPageCallbacks\b|\bPop\b|\bPush\b|\bQuit\b|\bReadEnvStr\b|\bReadINIStr\b|\bReadRegDWORD\b|\bReadRegStr\b|\bReboot\b|\bRegDLL\b|\bRename\b|\bRequestExecutionLevel\b|\bReserveFile\b|\bReturn\b|\bRMDir\b|\bSearchPath\b|\bSectionGetFlags\b|\bSectionGetInstTypes\b|\bSectionGetSize\b|\bSectionGetText\b|\bSectionIn\b|\bSectionSetFlags\b|\bSectionSetInstTypes\b|\bSectionSetSize\b|\bSectionSetText\b|\bSendMessage\b|\bSetAutoClose\b|\bSetBrandingImage\b|\bSetCompress\b|\bSetCompressor\b|\bSetCompressorDictSize\b|\bSetCtlColors\b|\bSetCurInstType\b|\bSetDatablockOptimize\b|\bSetDateSave\b|\bSetDetailsPrint\b|\bSetDetailsView\b|\bSetErrorLevel\b|\bSetErrors\b|\bSetFileAttributes\b|\bSetFont\b|\bSetOutPath\b|\bSetOverwrite\b|\bSetPluginUnload\b|\bSetRebootFlag\b|\bSetRegView\b|\bSetShellVarContext\b|\bSetSilent\b|\bShowInstDetails\b|\bShowUninstDetails\b|\bShowWindow\b|\bSilentInstall\b|\bSilentUnInstall\b|\bSleep\b|\bSpaceTexts\b|\bStrCmp\b|\bStrCmpS\b|\bStrCpy\b|\bStrLen\b|\bSubCaption\b|\bUnicode\b|\bUninstallButtonText\b|\bUninstallCaption\b|\bUninstallIcon\b|\bUninstallSubCaption\b|\bUninstallText\b|\bUninstPage\b|\bUnRegDLL\b|\bVar\b|\bVIAddVersionKey\b|\bVIFileVersion\b|\bVIProductVersion\b|\bWindowIcon\b|\bWriteINIStr\b|\bWriteRegBin\b|\bWriteRegDWORD\b|\bWriteRegExpandStr\b|\bWriteRegStr\b|\bWriteUninstaller\b|\bXPStyle\b|\bPage\b|\bUninstPage\b>/g,
    href: function(match) { return docs_url + match; }
  },
  {
    name: "NSIS Wiki",
    regexp: /\bSectionGroupEnd\b|\bSectionGroup\b|\bFunctionEnd\b|\bFunction\b|\bSectionEnd\b|\bSection\b|\bSubSectionEnd\b|\bSubSection\b|\bPageExEnd\b|\bPageEx\b/g,
    href: function(match) { return docs_url + match; }
  },
  {
    name: "NSIS Wiki",
    regexp: /\binclude\b|\baddincludedir\b|\baddplugindir\b|\bappendfile\b|\bcd\b|\bdelfile\b|\becho\b|\berror\b|\bexecute\b|\bpackhdr\b|\bfinalize\b|\bgetdllversionsystem\b|\btempfile\b|\bwarning\b|\bverbose\b|\bdefine\b|\bundef\b|\binsertmacro\b|\bmacro\b|\bmacroend\b|\bsearchparse\b|\bsearchreplace\b|\b!ifdef\b|\bifndef\b|\bif\b|\bifmacrodef\b|\bifmacrondef\b|\belse\b|\bendif\b/g,
    href: function(match) { return docs_url + "!" + match; }
  },
];


// HELPER FUNCTIONS

function digits(s)
{
  return s.replace(/[^0-9]/g, "");
}

function alphanumerics(s)
{
  return s.replace(/[^0-9a-z]/ig, "");
}


// LINK STYLING

function styleLink(a, filter)
{
  a.style.textDecoration = "underline";
  a.style.color = "inherit";
}


// FIX FILTERS

function fixFilters()
{
  var i, r;
  for (i = 0; r = filters[i]; ++i) {
    // lowercase, and replace each run of non-alphanumerics with a single hyphen
    r.classNamePart = r.name.toLowerCase().replace(/[^0-9a-z]+/ig, "-");
    if(!r.regexp.global)
      alert("AutoLink filter " + r.name + " is not global! This will break stuff!");
  }
}
fixFilters();


// WHEN AND WHERE TO RUN

var moddingDOM = false;

window.addEventListener("load", init, false);
function init()
{
  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  setTimeout(go, 50, document.body);
}

// This makes it work at Gmail.
// 20% performance penalty on a plain text file with a link on almost every line.
// Tiny performance penalty on pages with few automatically added links.
function nodeInserted(e)
{
  // our own modifications should not trigger this.
  // (we don't want our regular expression objects getting confused)
  // (we want better control over when we recurse)
  
  //GM_log("Inserted: " + e.target);
  
  if (!moddingDOM)
    go(e.target);
}

// DOM TRAVERSAL

// Ignore all children of these elements.
const skippedElements = { 
  a:        true, // keeps us from screwing with existing links. keeps us from recursing to death :)
  noscript: true, // noscript has uninterpreted, unshown text children; don't waste time+sanity there.
  head:     true,
  script:   true,
  style:    true,
  textarea: true,
  label:    true,
  select:   true,
  button:   true,
  h1:     true,
  h2:     true,
  h3:     true,
  h4:     true
}

const gmail = (location.host == "gmail.google.com");

function skipChildren(node)
{
  if (node.tagName)  // !
  {
    if (skippedElements[node.tagName.toLowerCase()]) {
      return true;
    }
    
    if (gmail) {
      if (node.className == "ac") // gmail autocomplete (fake dropdown)
        return true;
      if (node.className == "ilc sxs") // invite foo to gmail (fake link/button)
        return true;
    }
  }

  return false;
}


function go(traversalRoot)
{
  var m;
  
  // Ensure we're not already in a forbidden element.
  for (m = traversalRoot; m != undefined; m = m.parentNode) {
    if (skipChildren(m)) {
      return;
    }
  }

  // work around bug, or in case previous user scripts did crazy stuff
  traversalRoot.normalize();

  function cont(n, didChildren)
  {
    var k = 0; // split work into chunks so Firefox doesn't freeze
    var q;
    
    while (n && k < 100)
    {
      ++k;
    
      // Do stuff at this node
      if (!didChildren && n.nodeType == 3) {
        if((q = runFiltersOnTextNode(n))) {
          n = q[0];

          // if there were changes, run filters again on the new text node that's here          
          if (q[1]) 
            continue;
        }
      }
  
      // Traverse to the "next" node in depth-first order

      if (!n.firstChild)
        didChildren = true;
  
      if (didChildren && n == traversalRoot)
        break;
      else if (!didChildren && n.firstChild && !skipChildren(n)) {
        n = n.firstChild;
        // didChildren is already false and should stay false
      }
      else {
        if (n.nextSibling) {
          n = n.nextSibling;
          didChildren = false;
        }
        else {
          n = n.parentNode;
          didChildren = true;
        }
      }
    } // end while
  
    if (!n) {
      //GM_log("Odd. traversalRoot was " + traversalRoot);
    }
    else if (n == traversalRoot) {
      //GM_log("Done");
      //alert("AutoLink time: " + (new Date() - timeBefore))
    }
    else {
      // Continue after 10ms.
      //GM_log("will have to continue");
      setTimeout(cont, 10, n, didChildren);
    }
    
  } // end function cont
  
  cont(traversalRoot, false);
}


// RUNNING FILTERS

// runFiltersOnTextNode
// Return: node at which to continue traversal, or |null| to mean no changes were made.

function runFiltersOnTextNode(node)
{
  // Too many variables.  Good hint that I need to split this function up :P
  var source, j, regexp, match, lastLastIndex, k, filter, href, anyChanges; // things
  var used, unused, firstUnused, lastUnused, a, parent, nextSibling; // nodes
  
  source = node.data;
  
  anyChanges = false;

  // runFiltersOnTextNode has its own do-too-much-at-once avoider thingie.
  // assumption: if there is one text node with a lot of matches,
  // it's more important to finish quickly than be transparent.
  // (e.g. plain text file FULL of links)
  // assumption: 40 * 100 = 140.
  k=0;
  
  for (j = 0; filter = filters[j]; ++j) {
    regexp = filter.regexp;
    
    if (regexp.test(source)) {

      parent = node.parentNode;
      nextSibling = node.nextSibling;

      
      regexp.lastIndex = 0;
      firstUnused = null;
      
      // Optimization from the linkify that came with Greasemonkey(?):
      // instead of splitting a text node multiple times, take advantage
      // of global regexps and substring.

      for (match = null, lastLastIndex = 0; k < 40 && (match = regexp.exec(source)); ) {
      
        // this should happen first, so RegExp.foo is still good :)
        href = genLink(filter, match); 
        
        if (href != null && href != location.href) { 
          ++k;

          unused = document.createTextNode(source.substring(lastLastIndex, match.index));
          if (!anyChanges) {
            anyChanges = true;
            parent.removeChild(node);
            firstUnused = unused;
            moddingDOM = true;
          }
          parent.insertBefore(unused, nextSibling);

          used = document.createTextNode(match[0])
  
          a = document.createElement("a");
          a.href = href;
          a.title = "Look up on " + filter.name;
          a.className = "autolink autolink-" + filter.classNamePart;
  
          styleLink(a, filter);
  
          a.appendChild(used);
          parent.insertBefore(a, nextSibling);
          
          lastLastIndex = regexp.lastIndex;
        }

      }

      if (anyChanges) {
        lastUnused = document.createTextNode(source.substring(lastLastIndex));
        parent.insertBefore(lastUnused, nextSibling);
        moddingDOM = false;
        return [firstUnused, true]
      }
      
      return [node, false];
    }
  }
  return null;
}

function genLink(filter, match)
{
  try {
    return filter.href(match); 
  }
  catch(er) {
    return "data:text/plain,Error running AutoLink function for filter: " + encodeURIComponent(filter.name) + "%0A%0A" + encodeURIComponent(er);
  }
}
