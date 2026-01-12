{ pkgs ? import <nixpkgs> {} }:

let
  hashcards = pkgs.rustPlatform.buildRustPackage {
    pname = "hashcards";
    version = "0.3.0";
    src = ./.;
    cargoLock.lockFile = ./Cargo.lock;
    nativeBuildInputs = [ pkgs.pkg-config ];
    buildInputs = [ pkgs.sqlite pkgs.openssl ];
  };
in
pkgs.mkShell {
  buildInputs = [ hashcards ];
  shellHook = ''
    echo "hashcards $(hashcards --version)"
    echo ""
    echo "Commands:"
    echo "  hashcards new <deck>      Create a new deck"
    echo "  hashcards add <deck>      Add a card to a deck"
    echo "  hashcards drill <deck>    Start a drill session"
    echo "  hashcards list            List all decks"
    echo ""
  '';
}
