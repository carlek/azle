mkdir bitcoin && cd bitcoin

# Fetch the latest version
VERSION=$(curl -v --silent https://bitcoincore.org/en/download/ 2>&1 | grep -oh "[Ll]atest version: [0-9]*\.[0-9]*\.[0-9]*" | cut -d " " -f3)

# Download the tarball for MacOS
wget https://bitcoincore.org/bin/bitcoin-core-$VERSION/bitcoin-$VERSION-osx64.tar.gz

# Fetch the signature file
wget https://bitcoincore.org/bin/bitcoin-core-$VERSION/SHA256SUMS.asc

# Match signature
shasum -a 256 --check SHA256SUMS.asc

# Obtain a copy of the release signing key - signing key taken from https://bitcoincore.org/en/download
gpg --keyserver hkp://keyserver.ubuntu.com --recv-keys 01EA5486DE18A882D4C2684590C8019E36C2E964

# Verify PGP signature
gpg --verify SHA256SUMS.asc

# Unpack Bitcoin Core tarball
tar -zxvf bitcoin-$VERSION-osx64.tar.gz

# Deleting downloaded files
rm bitcoin-$VERSION-osx64.tar.gz SHA256SUMS.asc

# Adding binaries to PATH
cd bitcoin-$VERSION/bin
echo "export PATH=\$PATH:"$(pwd) >> ~/.zshrc
