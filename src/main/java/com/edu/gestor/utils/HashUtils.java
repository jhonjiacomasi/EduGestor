package com.edu.gestor.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

import org.springframework.stereotype.Component;

@Component
public class HashUtils {

	/**
	 * Gera um hash SHA-256 de uma string de entrada.
	 * 
	 * @param input A string de dados para hashing (concatenada de dados da
	 *              inscrição).
	 * @return O hash SHA-256 em formato hexadecimal.
	 */
	public String generateSha256Hash(String input) {
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] hash = digest.digest(input.getBytes(java.nio.charset.StandardCharsets.UTF_8));

			return HexFormat.of().formatHex(hash);

		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException("SHA-256 algorithm not available.", e);
		}
	}
}