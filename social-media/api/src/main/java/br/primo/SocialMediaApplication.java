package br.primo;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Contact;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.info.License;

import jakarta.ws.rs.core.Application;

@OpenAPIDefinition(
    info = @Info(
        title = "Social Media",
        version = "1.0.1",
        contact = @Contact(
            name="Willians M. Primo",
            url = "https://github.com/williansmprimo"
        ),
        license = @License(
            name = "MIT",
            url = "https://opensource.org/licenses/MIT"
          )
    )
)
public class SocialMediaApplication extends Application{}
