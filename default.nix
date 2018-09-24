{
  pkgs ? import <nixpkgs> { inherit system; },
  system ? builtins.currentSystem,
  nodejs ? pkgs."nodejs-8_x"
}:

let
  globalBuildInputs = [ pkgs.gauge pkgs.terraform ];
  nodeEnv = import ./node-env.nix {
    inherit (pkgs) stdenv python2 utillinux runCommand writeTextFile;
    inherit nodejs;
  };
  nodePackages = import ./node-packages.nix {
    inherit (pkgs) fetchurl fetchgit;
    inherit nodeEnv globalBuildInputs;
  };
in
  {
    package = nodePackages.package.override (attrs: {
      postInstall = ''
        npm run build
        cp package.json lib/package.json
      '';
    });

    shell = nodePackages.shell;
  }
