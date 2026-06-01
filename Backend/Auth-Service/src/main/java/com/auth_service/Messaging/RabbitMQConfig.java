package com.auth_service.Messaging;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;

import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    // QUEUE NAME
    public static final String QUEUE =
            "admin-status-queue";

    // EXCHANGE NAME
    public static final String EXCHANGE =
            "admin-exchange";

    // ROUTING KEY
    public static final String ROUTING_KEY =
            "admin.status";

    // CREATE QUEUE
    @Bean
    public Queue queue() {//Spring creates queue automatically.
        return new Queue(QUEUE);
    }

    // CREATE EXCHANGE
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }

    // BIND QUEUE + EXCHANGE
    @Bean
    public Binding binding(
            Queue queue,
            TopicExchange exchange
    ) {

        return BindingBuilder
                .bind(queue)
                .to(exchange)
                .with(ROUTING_KEY);
    }

    // JSON CONVERTER
    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // RABBIT TEMPLATE
    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory connectionFactory,
            Jackson2JsonMessageConverter converter
    ) {

        RabbitTemplate template =
                new RabbitTemplate(connectionFactory); //ConnectionFactory Creates connection to RabbitMQ server.

        template.setMessageConverter(converter);

        return template;
    }
}